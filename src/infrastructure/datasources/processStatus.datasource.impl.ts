import {ProcessStatusDatasource} from "../../domain/datasources/processStatus.datasource";
import {ProcessStatusEntity} from "../../domain/entities/processStatus.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {ProcessStatusSequelize} from "../database/models/ProcessStatus";
import {ProcessStatusRegisterDto} from "../../domain/dtos/processStatus.register.dto";
import {Op} from "sequelize";
import Constants from "../database/seeders/constants.seeder";

export class ProcessStatusDatasourceImpl implements ProcessStatusDatasource {
    async register(processStatusRegisterDto: ProcessStatusRegisterDto): Promise<ProcessStatusEntity> {
        try {
            const [processStatus, created] = await ProcessStatusSequelize.findOrCreate({
                where:{
                    processAbbreviation:processStatusRegisterDto.processAbbreviation
                },
                defaults:{
                    uuid:processStatusRegisterDto.uuid,
                    process:processStatusRegisterDto.process,
                    processAbbreviation:processStatusRegisterDto.processAbbreviation
                }
            })

            return processStatus
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

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
    async getCleanerStatus(): Promise<ProcessStatusEntity[]> {
        try {
            return await ProcessStatusSequelize.findAll({
                where:{
                    processAbbreviation:{
                        [Op.notLike]:Constants.processStatus.WAITING_TO_SEND
                    }
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