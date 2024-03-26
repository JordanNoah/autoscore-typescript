import {CronjobEntity} from "../entities/cronjob.entity";
import {CronjobRegisterDto} from "../dtos/cronjob-register.dto";

export abstract class CronjobDatasource {
    abstract getCronByAbbreviation(abbreviation: string): Promise<CronjobEntity|null>
    abstract setRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity>
    abstract setNotRunningCronByAbbreviation(abbreviation: string): Promise<CronjobEntity>
    abstract register(cronjobDto:CronjobRegisterDto): Promise<CronjobEntity>
}