import {CronJobSequelize} from "./models/Cronjob";
import {ProcessStatusSequelize} from "./models/ProcessStatus";
import {GradeReceiverSequelize} from "./models/GradeReceiver";
import {InstitutionSequelize} from "./models/Institution";
import {GradeSendingSequelize} from "./models/GradeSending";

export const DbSequelize = (): Promise<void> => {
    return new Promise( async (resolve, reject) => {
        try {
            await CronJobSequelize.sync()
            await ProcessStatusSequelize.sync()
            await GradeReceiverSequelize.sync()
            await InstitutionSequelize.sync()
            await GradeSendingSequelize.sync()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}