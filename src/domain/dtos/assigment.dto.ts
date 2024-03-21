export class AssigmentDto {
    constructor(
        public userId: number,
        public courseId: number,
        public source: string,
        public component: string,
        public activityId: number,
        public scoreToAssign: number,
        public dateToGrade: Date,
        public itemNumber: number,
        public itemModule: string,
        public contextId: number,
        public instanceId: number
    ) {}

    static create(object:{[key:string]:any}):[string?,AssigmentDto?]{
        const {
            user_id,
            course_id,
            source,
            component,
            activity_id,
            score_to_assign,
            date_to_grade,
            item_number,
            item_module,
            contextid,
            instance_id
        } = object

        return [
            undefined,
            new AssigmentDto(
                user_id,
                course_id,
                source,
                component,
                activity_id,
                score_to_assign,
                date_to_grade,
                item_number,
                item_module,
                contextid,
                instance_id
            )
        ]
    }
}