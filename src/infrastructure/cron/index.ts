import cron from "node-cron"
import AppConfig from '../../domain/config'
import {CronProcess} from "./process";
export class Cron {
    userNotFound() {
        cron.schedule(AppConfig.CRONJOB_USER_NOT_FOUND, async () => {
            console.log("user not found")
        })
    }

    processWaitingToSend(){
        cron.schedule(AppConfig.CRONJOB_AUTOSCORE,  async () => {
            await new CronProcess().autoScoreCronJob()
        })
    }

    cleaner() {
        cron.schedule(AppConfig.CRONJOB_CLEANER, async () => {
            console.log("cronjob cleaner")
        })
    }
}