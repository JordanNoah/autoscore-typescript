import {ProcessStatusDatasourceImpl} from "../datasources/processStatus.datasource.impl";
import {GradeSendingDatasourceImpl} from "../datasources/gradeSending.datasource.impl";
import {InstitutionDatasourceImpl} from "../datasources/institution.datasource.impl";
import {ExternalApiRepository} from "../client/ExternalApiRepository";
import {Utils} from "../../shared/utils";
import {GradeResponseDto} from "../../domain/dtos/moodle/grade-response.dto";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {InstitutionEntity} from "../../domain/entities/institution.entity";

export class CronProcess {
    async autoScoreCronJob () {
        try {

            console.log("---- cronjob auto score starting ----")

            let processStatusInProcess = await new ProcessStatusDatasourceImpl().getByAbbreviation('WAITING_TO_SEND')

            if (!processStatusInProcess) console.log("Process status WAITING_TO_SEND not found")

            let gradeSending = await new GradeSendingDatasourceImpl().getSyncAutoScore(processStatusInProcess!)

            if (gradeSending.length > 0) {
                console.log(`Found total of rows: ${gradeSending.length}`)
                for (let i = 0; i < gradeSending.length; i++) {
                    let element = gradeSending[i]
                    let processStatusProcessing = await new ProcessStatusDatasourceImpl().getByAbbreviation('PROCESSING')
                    if (!processStatusInProcess) console.log("Process status PROCESSING not found")
                    await new GradeSendingDatasourceImpl().updateStateProcess(element,processStatusInProcess!)
                    const campus = await new InstitutionDatasourceImpl().getById(element.institutionId!)
                    if (!campus){
                        console.log("Institution not found")
                    }else{
                        let externalApiRepository = new ExternalApiRepository(campus)

                        let grades = await externalApiRepository.gradereport_user_get_grade_items(element)
                        let [errorGradeResponse,gradesResponseMoodle] = GradeResponseDto.create(grades)
                        let gradesMoodle = new Utils().hasGrades(gradesResponseMoodle!,element)
                        let userEnrolledMoodle = await externalApiRepository.core_enrol_get_users_courses(element)
                        let userIsEnrolled = new Utils().isEnrolled(userEnrolledMoodle,element)
                        if (gradesMoodle && userIsEnrolled){
                            if (!gradesMoodle.gradeRaw){
                                await this.sendGrade(element,campus)
                            }else{
                                console.log("tiene ya una calificacion")
                            }
                        }else if (!gradesMoodle && userIsEnrolled){
                            await this.sendGrade(element,campus)
                        }
                    }
                }
            } else {
                console.log("Nothing found to synchronize, ending the auto score cronjob")
            }
        }catch (e){
            console.log(e)
        }
    }

    async sendGrade(gradeSendingEntity:GradeSendingEntity,campus: InstitutionEntity){
        let externalApiRepository = new ExternalApiRepository(campus)
        if (gradeSendingEntity.source === 'assign'){
            let graded = await externalApiRepository.mod_assign_save_grade(gradeSendingEntity)
            console.log("--graded assign--")
            console.log(graded)
        }else{
            let graded = await externalApiRepository.core_grades_grader_gradingpanel_point_store(gradeSendingEntity)
            console.log("--graded forum")
            console.log(graded)
        }
    }
}