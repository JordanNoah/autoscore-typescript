export class GradeSendingEntity {
    constructor(
        public id: number,
        public uuid: string,
        public userId: number,
        public courseId: number,
        public contextId: string,
        public source: string,
        public component: string,
        public activityId: number,
        public instanceId: number,
        public scoreToAssign: number,
        public dateToGrade: string,
        public itemNumber: number,
        public gradeReceiverId: number,
        public institutionId: number,
        public processStatusId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}