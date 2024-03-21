export class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public fullName: string,
        public abbreviation: string,
        public domain: string,
        public website: string,
        public restPath: string,
        public modality: string,
        public translations: string,
        public token: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}