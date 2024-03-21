export class ProcessStatusEntity {
    constructor(
        public id: number,
        public uuid: string,
        public process: string,
        public processAbbreviation: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}