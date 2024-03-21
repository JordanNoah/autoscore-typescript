import {AssigmentDto} from "./assigment.dto";

export class GradeReceiverRegisterDto {
    private constructor(
        public uuid: string,
        public firedAt: Date,
        public assigment: AssigmentDto,
        public institutionAbbreviation: string,
        public modality: string
    ) {}

    static create(object:{[key:string]:any}):[string?,GradeReceiverRegisterDto?]{
        const {
            uuid,
            fired_at,
            assignment,
            institution_abbreviation,
            modality
        } = object

        const [errorAssigment,assigmentDto] = AssigmentDto.create(assignment)

        if (errorAssigment) return [errorAssigment]
        if (!assigmentDto) return ['Assigment not found']

        return [
            undefined,
            new GradeReceiverRegisterDto(
                uuid,
                fired_at,
                assigmentDto,
                institution_abbreviation,
                modality
            )
        ]
    }
}