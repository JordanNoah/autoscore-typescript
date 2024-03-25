export class CronjobEntity {
    constructor(
        public id: number,
        public title: string,
        public abbreviation: string,
        public running: boolean,
        public nextRun: string,
        public icon: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

}