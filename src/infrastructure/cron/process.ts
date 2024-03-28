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
import {GradeReceiverDatasourceImpl} from "../datasources/gradeReceiver.datasource.impl";
import Constants from "../database/seeders/constants.seeder";

export class CronProcess {
    async autoScoreCronJob () {
        try {
            const cronjob = await new CronjobDatasourceImpl().getCronByAbbreviation(Constants.cronjob.AUTOSCORE)

            if (cronjob){
                if(!cronjob.running){
                    console.log("---- cronjob auto score starting ----")

                    let processStatusInProcess = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.WAITING_TO_SEND)

                    if (!processStatusInProcess) console.log("Process status WAITING_TO_SEND not found")

                    let gradeSending = await new GradeSendingDatasourceImpl().getSyncAutoScore(processStatusInProcess!)

                    if (gradeSending.length > 0) {
                        console.log(`Found total of rows: ${gradeSending.length}`)
                        await new CronjobDatasourceImpl().setRunningCronByAbbreviation(cronjob.abbreviation)
                        for (let i = 0; i < gradeSending.length; i++) {
                            let element = gradeSending[i]
                            await this.startProcessToMoodleByGradeSending(element)
                        }
                        await new CronjobDatasourceImpl().setNotRunningCronByAbbreviation(cronjob.abbreviation)
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

    async autoScoreCleaner() {
        try {
            const cronjob = await new CronjobDatasourceImpl().getCronByAbbreviation(Constants.cronjob.CLEANER)

            if (cronjob){
                if (!cronjob.running){
                    await new CronjobDatasourceImpl().setRunningCronByAbbreviation(cronjob.abbreviation)
                    console.log("---- cronjob autoscore cleaner starting ----")
                    const gradesSendingToRemove = await new GradeSendingDatasourceImpl().getCleanerAutoScore()
                    const arraysIdGradeSending = gradesSendingToRemove.map(e=> e.id)
                    const arraysIdGradeReceiver = gradesSendingToRemove.map(e => e.gradeReceiverId)

                    await new GradeSendingDatasourceImpl().deleteByGroupsIds(arraysIdGradeSending)
                    await new GradeReceiverDatasourceImpl().deleteByGroupsIds(arraysIdGradeReceiver)
                    await new CronjobDatasourceImpl().setNotRunningCronByAbbreviation(cronjob.abbreviation)
                    console.log("---- cronjob autoscore cleaner stopped ----")
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async autoScoreUserNotFound() {
        try {
            const cronjob = await new CronjobDatasourceImpl().getCronByAbbreviation(Constants.cronjob.USERNOTFOUND)

            if (cronjob){
                if (!cronjob.running){
                    await new CronjobDatasourceImpl().setRunningCronByAbbreviation(cronjob.abbreviation)
                    console.log("---- cronjob autoscore usernotfound starting ----")

                    const gradeSending = await new GradeSendingDatasourceImpl().getUserNotFound()

                    if (gradeSending.length > 0) {
                        console.log(`Found total of rows: ${gradeSending.length}`)
                        for (let i = 0; i <gradeSending.length; i++){
                            const element = gradeSending[i];
                            await this.startProcessToMoodleByGradeSending(element)
                        }
                    }

                    await new CronjobDatasourceImpl().setNotRunningCronByAbbreviation(cronjob.abbreviation)
                    console.log("---- cronjob autoscore usernotfound stopped ----")
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async startProcessToMoodleByGradeSending(gradeSending: GradeSendingEntity):Promise<void>{
        try {
            await new GradeSendingDatasourceImpl().setInProcessStateProcess(gradeSending)
            const campus = await new InstitutionDatasourceImpl().getById(gradeSending.institutionId!)
            if (!campus){
                await new GradeSendingDatasourceImpl().setInstitutionNotFoundStateProcess(gradeSending)
            }else{
                let externalApiRepository = new ExternalApiRepository(campus)

                let grades = await externalApiRepository.gradereport_user_get_grade_items(gradeSending)
                let [errorGradeResponse,gradesResponseMoodle] = GradeResponseDto.create(grades)
                let gradesMoodle = new Utils().hasGrades(gradesResponseMoodle!,gradeSending)
                let userEnrolledMoodle = await externalApiRepository.core_enrol_get_users_courses(gradeSending)
                let userIsEnrolled = new Utils().isEnrolled(userEnrolledMoodle,gradeSending)
                if (!userIsEnrolled) await new GradeSendingDatasourceImpl().setUserNotFound(gradeSending)
                if (gradesMoodle && userIsEnrolled){
                    if (!gradesMoodle.gradeRaw){
                        await this.sendGrade(gradeSending,campus)
                    }else{
                        await new GradeSendingDatasourceImpl().setExistingGradeStateProcess(gradeSending)
                    }
                }else if (!gradesMoodle && userIsEnrolled){
                    await this.sendGrade(gradeSending,campus)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}