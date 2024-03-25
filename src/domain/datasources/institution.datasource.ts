import {InstitutionEntity} from "../entities/institution.entity";
import {InstitutionRegisterDto} from "../dtos/institution.register.dto";

export abstract class InstitutionDatasource {
    abstract register(institutionRegisterDto:InstitutionRegisterDto): Promise<InstitutionEntity>
    abstract getById(id:number): Promise<InstitutionEntity|null>
    abstract getByInstitutionAbbreviationAndModality(institutionAbbreviation:string, modality:string): Promise<InstitutionEntity|null>
}