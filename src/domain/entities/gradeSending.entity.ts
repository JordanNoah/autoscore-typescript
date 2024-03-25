export class GradeSendingEntity {
    constructor(
        public id: number,
        public uuid: string,
        public userId: number,
        public courseId: number,
        public contextId: number,
        public source: string,
        public component: string,
        public activityId: number,
        public instanceId: number,
        public scoreToAssign: number,
        public dateToGrade: Date,
        public itemNumber: number|null,
        public gradeReceiverId: number,
        public institutionId: number|null,
        public processStatusId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}