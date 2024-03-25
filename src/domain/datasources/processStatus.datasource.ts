import {ProcessStatusEntity} from "../entities/processStatus.entity";
import {ProcessStatusRegisterDto} from "../dtos/processStatus.register.dto";

export abstract class ProcessStatusDatasource {
    abstract register(processStatusRegisterDto:ProcessStatusRegisterDto): Promise<ProcessStatusEntity>
    abstract getByAbbreviation(abbreviation: string): Promise<ProcessStatusEntity|null>
}