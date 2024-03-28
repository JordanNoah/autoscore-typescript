import cron from "node-cron"
import AppConfig from '../../domain/config'
import {CronProcess} from "./process";
export class Cron {
    userNotFound() {
        cron.schedule(AppConfig.CRONJOB_USER_NOT_FOUND, async () => {
            await new CronProcess().autoScoreUserNotFound()
        })
    }

    processWaitingToSend(){
        cron.schedule(AppConfig.CRONJOB_AUTOSCORE,  async () => {
            await new CronProcess().autoScoreCronJob()
        })
    }

    cleaner() {
        cron.schedule(AppConfig.CRONJOB_CLEANER, async () => {
            await new CronProcess().autoScoreCleaner()
        })
    }
}