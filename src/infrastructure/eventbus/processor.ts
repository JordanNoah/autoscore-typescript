import {GradeReceiverRegisterDto} from "../../domain/dtos/gradeReceiver.register.dto";
import {GradeReceiverDatasourceImpl} from "../datasources/gradeReceiver.datasource.impl";
import {ProcessStatusDatasourceImpl} from "../datasources/processStatus.datasource.impl";
import {InstitutionDatasourceImpl} from "../datasources/institution.datasource.impl";
import {GradeSendingDatasourceImpl} from "../datasources/gradeSending.datasource.impl";

export class Processor {
    public static async activityCompleted(content: object) {
        const [errorGradeReceiverDto, gradeReceiverDto] = GradeReceiverRegisterDto.create(content)
        const gradeReceiverEntity = await new GradeReceiverDatasourceImpl().register(gradeReceiverDto!)
        const processStatusInProcessEntity = await new ProcessStatusDatasourceImpl().getByAbbreviation('WAITING_TO_SEND')
        if (!processStatusInProcessEntity) throw new Error("Process status not found")
        const institutionEntity = await new InstitutionDatasourceImpl().getByInstitutionAbbreviationAndModality(gradeReceiverEntity.institutionAbbreviation,gradeReceiverEntity.modality)
        if (!institutionEntity){
            console.error("Institution not found")
        }
        await new GradeSendingDatasourceImpl().register(gradeReceiverEntity,institutionEntity,processStatusInProcessEntity)
    }
}