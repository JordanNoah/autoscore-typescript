import {InstitutionEntity} from "../entities/institution.entity";

export abstract class InstitutionDatasource {
    abstract getByInstitutionAbbreviationAndModality(institutionAbbreviation:string, modality:string): Promise<InstitutionEntity|null>
}