import {CronjobEntity} from "../entities/cronjob.entity";

export abstract class CronjobDatasource {
    abstract getCronByAbbreviation(abbreviation: string): Promise<CronjobEntity|null>
    abstract setRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity>
    abstract setNotRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity>
}