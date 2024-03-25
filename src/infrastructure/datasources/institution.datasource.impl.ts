import {InstitutionDatasource} from "../../domain/datasources/institution.datasource";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {InstitutionSequelize} from "../database/models/Institution";
import {InstitutionRegisterDto} from "../../domain/dtos/institution.register.dto";

export class InstitutionDatasourceImpl implements InstitutionDatasource {
    async register(institutionRegisterDto: InstitutionRegisterDto): Promise<InstitutionEntity> {
        try {
            const [institution, created] = await InstitutionSequelize.findOrCreate({
                where:{
                    abbreviation:institutionRegisterDto.abbreviation,
                    modality:institutionRegisterDto.modality
                },
                defaults:{
                    uuid:institutionRegisterDto.uuid,
                    name:institutionRegisterDto.name,
                    fullName:institutionRegisterDto.fullName,
                    abbreviation:institutionRegisterDto.abbreviation,
                    modality:institutionRegisterDto.modality,
                    token:institutionRegisterDto.token,
                    domain:institutionRegisterDto.domain,
                    website:institutionRegisterDto.website,
                    translations:institutionRegisterDto.translations,
                    restPath:institutionRegisterDto.restPath
                }
            })
            return institution
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

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

    async getById(id: number): Promise<InstitutionEntity | null> {
        try {
            return await InstitutionSequelize.findOne({
                where:{
                    id:id
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