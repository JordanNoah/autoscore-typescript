import {CronJobSequelize} from "./models/Cronjob";
import {ProcessStatusSequelize} from "./models/ProcessStatus";
import {GradeReceiverSequelize} from "./models/GradeReceiver";
import {InstitutionSequelize} from "./models/Institution";
import {GradeSendingSequelize} from "./models/GradeSending";
import {InstitutionSeederExec} from "./seeders/exec/institution.seeder.exec";
import {ProcessStatusSeederExec} from "./seeders/exec/processStatus.seeder.exec";
import {CronjobSeederExec} from "./seeders/exec/cronjob.seeder.exec";

export const DbSequelize = (): Promise<void> => {
    return new Promise( async (resolve, reject) => {
        try {
            await CronJobSequelize.sync()
            await ProcessStatusSequelize.sync()
            await GradeReceiverSequelize.sync()
            await InstitutionSequelize.sync()
            await GradeSendingSequelize.sync()

            await new InstitutionSeederExec().up()
            await new ProcessStatusSeederExec().up()
            await new CronjobSeederExec().up()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}