import {GradeSendingDatasource} from "../../domain/datasources/gradeSending.datasource";
import {GradeReceiverEntity} from "../../domain/entities/gradeReceiver.entity";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {ProcessStatusEntity} from "../../domain/entities/processStatus.entity";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GradeSendingSequelize} from "../database/models/GradeSending";
import {GradeReceiverSequelize} from "../database/models/GradeReceiver";
import {Op} from "sequelize";
import ConstantsSeeder from "../database/seeders/constants.seeder";
import {ProcessStatusDatasourceImpl} from "./processStatus.datasource.impl";

export class GradeSendingDatasourceImpl implements GradeSendingDatasource {
    async register(gradeReceiverEntity: GradeReceiverEntity, institution: InstitutionEntity|null, processStatusEntity: ProcessStatusEntity): Promise<GradeSendingEntity> {
        try {
            const [gradeSending, created] = await GradeSendingSequelize.findOrCreate({
                where:{
                    uuid:gradeReceiverEntity.uuid
                },
                defaults:{
                    uuid: gradeReceiverEntity.uuid,
                    userId: gradeReceiverEntity.assigment.userId,
                    courseId: gradeReceiverEntity.assigment.courseId,
                    source: gradeReceiverEntity.assigment.source,
                    component: gradeReceiverEntity.assigment.component,
                    instanceId: gradeReceiverEntity.assigment.instanceId,
                    contextId: gradeReceiverEntity.assigment.contextId,
                    activityId: gradeReceiverEntity.assigment.activityId,
                    scoreToAssign: gradeReceiverEntity.assigment.scoreToAssign,
                    dateToGrade: gradeReceiverEntity.assigment.dateToGrade,
                    itemNumber: gradeReceiverEntity.assigment.itemNumber,
                    processStatusId: processStatusEntity.id,
                    gradeReceiverId: gradeReceiverEntity.id,
                    institutionId: institution ? institution.id : null
                }
            })
            return gradeSending
        } catch (error) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async updateStateProcess(gradeSendingEntity: GradeSendingEntity, processStatusEntity: ProcessStatusEntity): Promise<GradeSendingEntity> {
        try {
            console.log(`${processStatusEntity.process}: ${gradeSendingEntity.uuid}`)
            gradeSendingEntity.processStatusId = processStatusEntity.id
            await GradeSendingSequelize.update({
                processStatusId:gradeSendingEntity.processStatusId
            },{
                where:{
                    id:gradeSendingEntity.id
                }
            })

            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<GradeSendingEntity|null> {
        try {
            return GradeSendingSequelize.findOne({
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

    async getSyncAutoScore(processStatus: ProcessStatusEntity): Promise<GradeSendingEntity[]> {
        try {
            let dateNow = new Date(Date.now()).toISOString()
            return GradeSendingSequelize.findAll({
                where:{
                    processStatusId:processStatus.id,
                    dateToGrade:{
                        [Op.lte]:dateNow
                    }
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setMoodleErrorStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.MOODLE_ERROR)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setSuccessfulMoodleStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.SUCCESSFUL_MOODLE)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setExistingGradeStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.EXISTING_GRADE)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setInProcessStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.PROCESSING)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setInstitutionNotFoundStateProcess(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.INSTITUTION_NOT_FOUND)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async setUserNotFound(gradeSendingEntity: GradeSendingEntity): Promise<GradeSendingEntity> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getByAbbreviation(ConstantsSeeder.processStatus.USER_NOT_FOUND)
            await new GradeSendingDatasourceImpl().updateStateProcess(gradeSendingEntity,processStatus!)
            gradeSendingEntity.processStatusId = processStatus!.id
            return gradeSendingEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getCleanerAutoScore(): Promise<GradeSendingEntity[]> {
        try {
            const processStatus = await new ProcessStatusDatasourceImpl().getCleanerStatus()
            const arrayIdStatus = processStatus.map(e => e.id)
            return await GradeSendingSequelize.findAll({
                where:{
                    processStatusId:{
                        [Op.in]:arrayIdStatus
                    }
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteByGroupsIds(ids: number[]): Promise<void> {
        try {
            await GradeSendingSequelize.destroy({
                where:{
                    id:{
                        [Op.in]:ids
                    }
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