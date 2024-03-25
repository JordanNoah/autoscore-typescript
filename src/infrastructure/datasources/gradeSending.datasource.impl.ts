import {GradeSendingDatasource} from "../../domain/datasources/gradeSending.datasource";
import {GradeReceiverEntity} from "../../domain/entities/gradeReceiver.entity";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {ProcessStatusEntity} from "../../domain/entities/processStatus.entity";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GradeSendingSequelize} from "../database/models/GradeSending";
import {GradeReceiverSequelize} from "../database/models/GradeReceiver";
import {Op} from "sequelize";

export class GradeSendingDatasourceImpl implements GradeSendingDatasource {
    async register(gradeReceiverEntity: GradeReceiverEntity, institution: InstitutionEntity|null, processStatusEntity: ProcessStatusEntity): Promise<GradeSendingEntity> {
        try {
            console.log(gradeReceiverEntity.assigment)
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
            gradeSendingEntity.processStatusId = processStatusEntity.id
            await GradeReceiverSequelize.update(gradeSendingEntity,{
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
}