import {GradeSendingRepository} from "../../domain/repositories/gradeSending.repository";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {GradeReceiverEntity} from "../../domain/entities/gradeReceiver.entity";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {ProcessStatusEntity} from "../../domain/entities/processStatus.entity";
import {GradeSendingDatasource} from "../../domain/datasources/gradeSending.datasource";

export class GradeSendingRepositoryImpl implements GradeSendingRepository {
    constructor(
        private readonly gradeSendingDatasource:GradeSendingDatasource
    ) {}

    getById(id: number): Promise<GradeSendingEntity | null> {
        return this.gradeSendingDatasource.getById(id)
    }
    register(gradeReceiverEntity: GradeReceiverEntity, institution: InstitutionEntity, processStatusEntity: ProcessStatusEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.register(gradeReceiverEntity,institution,processStatusEntity)
    }
    setExistingGradeStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setExistingGradeStateProcess(gradeSendingEntity)
    }
    getSyncAutoScore(processStatus: ProcessStatusEntity): Promise<GradeSendingEntity[]> {
        return this.gradeSendingDatasource.getSyncAutoScore(processStatus)
    }
    setInProcessStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setInProcessStateProcess(gradeSendingEntity)
    }
    setUserNotFound(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setUserNotFound(gradeSendingEntity)
    }
    updateStateProcess(gradeSendingEntity: GradeSendingEntity, processStatusEntity: ProcessStatusEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.updateStateProcess(gradeSendingEntity,processStatusEntity)
    }
    setInstitutionNotFoundStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setInstitutionNotFoundStateProcess(gradeSendingEntity)
    }
    deleteByGroupsIds(ids: number[]): Promise<void> {
        return this.gradeSendingDatasource.deleteByGroupsIds(ids)
    }
    getCleanerAutoScore(): Promise<GradeSendingEntity[]> {
        return this.gradeSendingDatasource.getCleanerAutoScore()
    }
    getUserNotFound(): Promise<GradeSendingEntity[]> {
        return this.gradeSendingDatasource.getUserNotFound()
    }
    setMoodleErrorStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setMoodleErrorStateProcess(gradeSendingEntity)
    }
    setSuccessfulMoodleStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        return this.gradeSendingDatasource.setSuccessfulMoodleStateProcess(gradeSendingEntity)
    }
}