import {CronjobDatasource} from "../../domain/datasources/cronjob.datasource";
import {CronjobEntity} from "../../domain/entities/cronjob.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {CronJobSequelize} from "../database/models/Cronjob";

export class CronjobDatasourceImpl extends CronjobDatasource{
    async getCronByAbbreviation(abbreviation: string): Promise<CronjobEntity|null> {
        try {
            return await CronJobSequelize.findOne({
                where:{
                    abbreviation:abbreviation
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity> {
        try {
            let cronjob = await this.getCronByAbbreviation(abbreviation)
            if (!cronjob){
                console.log(`Cronjob ${abbreviation} not found`)
                throw CustomError.notFound(`Cronjob ${abbreviation} not found`)
            } else {
                await CronJobSequelize.update({
                    running:true
                },{
                    where:{
                        id:cronjob.id
                    }
                })

                cronjob.running = true

                return cronjob
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setNotRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity> {
        try {
            let cronjob = await this.getCronByAbbreviation(abbreviation)
            if (!cronjob){
                console.log(`Cronjob ${abbreviation} not found`)
                throw CustomError.notFound(`Cronjob ${abbreviation} not found`)
            } else {
                await CronJobSequelize.update({
                    running:false
                },{
                    where:{
                        id:cronjob.id
                    }
                })

                cronjob.running = false

                return cronjob
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}