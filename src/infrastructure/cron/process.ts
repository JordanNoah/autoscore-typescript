import {ProcessStatusDatasourceImpl} from "../datasources/processStatus.datasource.impl";
import {GradeSendingDatasourceImpl} from "../datasources/gradeSending.datasource.impl";
import {InstitutionDatasourceImpl} from "../datasources/institution.datasource.impl";

export class CronProcess {
    async autoScoreCronJob () {

        console.log("cronjob auto score starting")

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
                if (!campus) console.log("Institution not found")


            }
        } else {
            console.log("Nothing found to synchronize, ending the auto score cronjob")
        }
    }
}