import {GradeReceiverEntity} from "../entities/gradeReceiver.entity";
import {GradeReceiverRegisterDto} from "../dtos/gradeReceiver.register.dto";

export abstract class GradeReceiverDatasource {
    abstract register(gradeReceiverRegisterDto:GradeReceiverRegisterDto): Promise<GradeReceiverEntity>
    abstract deleteByGroupsIds(ids:number[]): Promise<void>
}