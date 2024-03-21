import {ProcessStatusDatasource} from "../../domain/datasources/processStatus.datasource";
import {ProcessStatusEntity} from "../../domain/entities/processStatus.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {ProcessStatusSequelize} from "../database/models/ProcessStatus";

export class ProcessStatusDatasourceImpl implements ProcessStatusDatasource {
    async getByAbbreviation(abbreviation: string): Promise<ProcessStatusEntity | null> {
        try {
            return await ProcessStatusSequelize.findOne({
                where:{
                    processAbbreviation:abbreviation
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}