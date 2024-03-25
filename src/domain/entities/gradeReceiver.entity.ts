import {AssigmentEntity} from "./assigment.entity";

export class GradeReceiverEntity {
    constructor(
        public id: number,
        public uuid: string,
        public firedAt: Date,
        public assigment: AssigmentEntity,
        public institutionAbbreviation: string,
        public modality: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}