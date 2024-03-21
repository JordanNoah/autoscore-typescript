import {InstitutionDatasource} from "../../domain/datasources/institution.datasource";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {InstitutionSequelize} from "../database/models/Institution";

export class InstitutionDatasourceImpl implements InstitutionDatasource {
    async getByInstitutionAbbreviationAndModality(institutionAbbreviation: string, modality: string): Promise<InstitutionEntity|null> {
        try {
            return await InstitutionSequelize.findOne({
                where:{
                    abbreviation:institutionAbbreviation,
                    modality:modality
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