import {GradeReceiverEntity} from "./gradeReceiver.entity";
import {JSON} from "sequelize";

export class AssigmentEntity {
    constructor(
        public userId: number,
        public courseId: number,
        public source: string,
        public component: string,
        public instanceId: number,
        public contextId: number,
        public activityId: number,
        public scoreToAssign: number,
        public dateToGrade: Date,
        public itemNumber: number
    ) {}

    static create(object:{[key:string]:any}):AssigmentEntity {
        const {
            userId,
            courseId,
            source,
            component,
            activityId,
            scoreToAssign,
            dateToGrade,
            itemNumber,
            contextId,
            instanceId
        } = object
        return new AssigmentEntity(
            userId,
            courseId,
            source,
            component,
            instanceId,
            contextId,
            activityId,
            scoreToAssign,
            dateToGrade,
            itemNumber
        )
    }
}