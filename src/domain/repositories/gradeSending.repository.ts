import {GradeReceiverEntity} from "../entities/gradeReceiver.entity";
import {InstitutionEntity} from "../entities/institution.entity";
import {ProcessStatusEntity} from "../entities/processStatus.entity";
import {GradeSendingEntity} from "../entities/gradeSending.entity";

export abstract class GradeSendingRepository {
    abstract register(gradeReceiverEntity:GradeReceiverEntity,
                      institution:InstitutionEntity,
                      processStatusEntity:ProcessStatusEntity): Promise<GradeSendingEntity>
    abstract updateStateProcess(gradeSendingEntity:GradeSendingEntity,
                                processStatusEntity:ProcessStatusEntity): Promise<GradeSendingEntity>
    abstract setMoodleErrorStateProcess(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract setSuccessfulMoodleStateProcess(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract setInProcessStateProcess(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract setInstitutionNotFoundStateProcess(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract setExistingGradeStateProcess(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract setUserNotFound(gradeSendingEntity:GradeSendingEntity): Promise<GradeSendingEntity>
    abstract getById(id:number): Promise<GradeSendingEntity|null>
    abstract getSyncAutoScore(processStatus:ProcessStatusEntity): Promise<GradeSendingEntity[]>
    abstract getCleanerAutoScore(): Promise<GradeSendingEntity[]>
    abstract getUserNotFound(): Promise<GradeSendingEntity[]>
    abstract deleteByGroupsIds(ids:number[]): Promise<void>
}