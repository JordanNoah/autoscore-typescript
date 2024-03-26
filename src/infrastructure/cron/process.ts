import {ProcessStatusDatasourceImpl} from "../datasources/processStatus.datasource.impl";
import {GradeSendingDatasourceImpl} from "../datasources/gradeSending.datasource.impl";
import {InstitutionDatasourceImpl} from "../datasources/institution.datasource.impl";
import {ExternalApiRepository} from "../client/ExternalApiRepository";
import {Utils} from "../../shared/utils";
import {GradeResponseDto} from "../../domain/dtos/moodle/grade-response.dto";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {CronjobDatasourceImpl} from "../datasources/cronjob.datasource.impl";
import ConstantsSeeder from "../database/seeders/constants.seeder";

export class CronProcess {
    async autoScoreCronJob () {
        try {
            const cronjob = await new CronjobDatasourceImpl().getCronByAbbreviation('AUTOSCORE')

            if (cronjob){
                if(!cronjob.running){
                    console.log("---- cronjob auto score starting ----")

                    let processStatusInProcess = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.WAITING_TO_SEND)

                    if (!processStatusInProcess) console.log("Process status WAITING_TO_SEND not found")

                    let gradeSending = await new GradeSendingDatasourceImpl().getSyncAutoScore(processStatusInProcess!)

                    if (gradeSending.length > 0) {
                        console.log(`Found total of rows: ${gradeSending.length}`)
                        await new CronjobDatasourceImpl().setRunningCronByAbbreviation('AUTOSCORE')
                        for (let i = 0; i < gradeSending.length; i++) {
                            let element = gradeSending[i]
                            await new GradeSendingDatasourceImpl().setInProcessStateProcess(element)
                            const campus = await new InstitutionDatasourceImpl().getById(element.institutionId!)
                            if (!campus){
                                await new GradeSendingDatasourceImpl().setInstitutionNotFoundStateProcess(element)
                            }else{
                                let externalApiRepository = new ExternalApiRepository(campus)

                                let grades = await externalApiRepository.gradereport_user_get_grade_items(element)
                                let [errorGradeResponse,gradesResponseMoodle] = GradeResponseDto.create(grades)
                                let gradesMoodle = new Utils().hasGrades(gradesResponseMoodle!,element)
                                let userEnrolledMoodle = await externalApiRepository.core_enrol_get_users_courses(element)
                                let userIsEnrolled = new Utils().isEnrolled(userEnrolledMoodle,element)
                                if (!userIsEnrolled) await new GradeSendingDatasourceImpl().setUserNotFound(element)
                                if (gradesMoodle && userIsEnrolled){
                                    if (!gradesMoodle.gradeRaw){
                                        await this.sendGrade(element,campus)
                                    }else{
                                        await new GradeSendingDatasourceImpl().setExistingGradeStateProcess(element)
                                    }
                                }else if (!gradesMoodle && userIsEnrolled){
                                    await this.sendGrade(element,campus)
                                }
                            }
                        }
                        await new CronjobDatasourceImpl().setNotRunningCronByAbbreviation('AUTOSCORE')
                        console.log("---- cronjob auto score finish ----")
                    } else {
                        console.log("Nothing found to synchronize, ending the auto score cronjob")
                    }
                }else{
                    console.log("El cronjob esta corriendo asi que no se continua")
                }
            }
        }catch (e){
            console.log(e)
        }
    }

    async sendGrade(gradeSendingEntity:GradeSendingEntity,campus: InstitutionEntity){
        let externalApiRepository = new ExternalApiRepository(campus)
        if (gradeSendingEntity.source === 'assign'){
            let graded = await externalApiRepository.mod_assign_save_grade(gradeSendingEntity)
            if (!graded){
                await new GradeSendingDatasourceImpl().setSuccessfulMoodleStateProcess(gradeSendingEntity)
            }else{
                await new GradeSendingDatasourceImpl().setMoodleErrorStateProcess(gradeSendingEntity)
            }
        }else{
            let graded = await externalApiRepository.core_grades_grader_gradingpanel_point_store(gradeSendingEntity)
            if ('grade' in graded){
                await new GradeSendingDatasourceImpl().setSuccessfulMoodleStateProcess(gradeSendingEntity)
            }else{
                await new GradeSendingDatasourceImpl().setMoodleErrorStateProcess(gradeSendingEntity)
            }
        }
    }
}