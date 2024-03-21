import {GradeReceiverDatasource} from "../../domain/datasources/gradeReceiver.datasource";
import {GradeReceiverRegisterDto} from "../../domain/dtos/gradeReceiver.register.dto";
import {GradeReceiverEntity} from "../../domain/entities/gradeReceiver.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GradeReceiverSequelize} from "../database/models/GradeReceiver";

export class GradeReceiverDatasourceImpl implements GradeReceiverDatasource {
    async register(gradeReceiverRegisterDto:GradeReceiverRegisterDto): Promise<GradeReceiverEntity> {
        try {
            const [gradeReceiver,created] = await GradeReceiverSequelize.findOrCreate({
                where:{
                    uuid:gradeReceiverRegisterDto.uuid
                },
                defaults: {
                    uuid:gradeReceiverRegisterDto.uuid,
                    firedAt:gradeReceiverRegisterDto.firedAt,
                    assigment:JSON.stringify(gradeReceiverRegisterDto.assigment),
                    institutionAbbreviation:gradeReceiverRegisterDto.institutionAbbreviation,
                    modality:gradeReceiverRegisterDto.modality
                }
            })
            return gradeReceiver
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}