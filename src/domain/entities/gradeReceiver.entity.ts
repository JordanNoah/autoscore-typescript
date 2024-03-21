export class GradeReceiverEntity {
    constructor(
        public id: number,
        public uuid: string,
        public firedAt: Date,
        public assigment: string,
        public institutionAbbreviation: string,
        public modality: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}