import {GradeReceiverRegisterDto} from "../../domain/dtos/gradeReceiver.register.dto";
import {GradeReceiverDatasourceImpl} from "../datasources/gradeReceiver.datasource.impl";
import {ProcessStatusDatasourceImpl} from "../datasources/processStatus.datasource.impl";
import {InstitutionDatasourceImpl} from "../datasources/institution.datasource.impl";

export class Processor {
    public static async activityCompleted(content: object) {
        const [errorGradeReceiverDto, gradeReceiverDto] = GradeReceiverRegisterDto.create(content)
        const gradeReceiver = await new GradeReceiverDatasourceImpl().register(gradeReceiverDto!)
        const processStatusInProcess = await new ProcessStatusDatasourceImpl().getByAbbreviation('WAITING_TO_SEND')
        if (!processStatusInProcess) console.log("Process status not found")
        const institution = await new InstitutionDatasourceImpl().getByInstitutionAbbreviationAndModality(gradeReceiver.institutionAbbreviation,gradeReceiver.modality)
        if (!institution) console.log("Institution not found")
        console.log(gradeReceiver)
    }
}