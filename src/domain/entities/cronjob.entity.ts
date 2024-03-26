export class CronjobEntity {
    constructor(
        public id: number,
        public title: string,
        public abbreviation: string,
        public running: boolean,
        public nextRun: number,
        public icon: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

}