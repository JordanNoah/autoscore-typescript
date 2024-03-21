import {ProcessStatusEntity} from "../entities/processStatus.entity";

export abstract class ProcessStatusDatasource {
    abstract getByAbbreviation(abbreviation: string): Promise<ProcessStatusEntity|null>
}