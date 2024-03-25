import {GradeResponseDto} from "../domain/dtos/moodle/grade-response.dto";
import {GradeItemDto} from "../domain/dtos/moodle/grade-item.dto";
import {GradeSendingEntity} from "../domain/entities/gradeSending.entity";
import {CourseEnrolledDto} from "../domain/dtos/moodle/course-enrolled.dto";

export class Utils {
    public hasGrades(gradesMoodleResponse:GradeResponseDto,gradeSendingEntity:GradeSendingEntity): GradeItemDto|null {
        let findGrade: GradeItemDto|null = null
        for (let i = 0; i < gradesMoodleResponse.userGrades.length; i++) {
            let element = gradesMoodleResponse.userGrades[i]
            let gradeItemDto = element.gradeItems.filter((gradeItem) => {
                return gradeItem.cmId === gradeSendingEntity.activityId && gradeItem.itemName != null
            })
            if (gradeItemDto.length>0){
                findGrade = gradeItemDto[0]
            }
        }
        return findGrade
    }

    public isEnrolled(courseEnrolledDto:CourseEnrolledDto[],gradeSendingEntity:GradeSendingEntity): boolean {
        return courseEnrolledDto.some((e) => e.id === gradeSendingEntity.courseId)
    }
}