import {CronJobSequelize} from "../../models/Cronjob";
import CronjobSeederData from "../data/cronjob.seeder.data";
import {CronjobRegisterDto} from "../../../../domain/dtos/cronjob-register.dto";
import {CronjobDatasourceImpl} from "../../../datasources/cronjob.datasource.impl";

export class CronjobSeederExec {
    public async up(){
        const cronjobSeeder = CronjobSeederData;
        for (let i = 0; i < cronjobSeeder.length; i++) {
            const [error,cronjobDto] = CronjobRegisterDto.create(cronjobSeeder[i])
            if (error) throw Error(error)
            const cronjob = cronjobDto!
            await new CronjobDatasourceImpl().register(cronjob)
        }
    }
    public async down() {
        await CronJobSequelize.sync({force:true})
    }
}