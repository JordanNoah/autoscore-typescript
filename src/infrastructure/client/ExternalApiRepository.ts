import {Axios} from "./axios";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {GradeSendingEntity} from "../../domain/entities/gradeSending.entity";
import {CourseEnrolledDto} from "../../domain/dtos/moodle/course-enrolled.dto";
import {AxiosResponse} from "axios";


export class ExternalApiRepository {
    private axios: Axios
    private institution: InstitutionEntity

    constructor(
        institution: InstitutionEntity
    ) {
        this.axios = Axios.getInstance(`${institution.website}${institution.restPath}`)
        this.institution = institution
    }

    public async gradereport_user_get_grade_items(gradeSendingEntity:GradeSendingEntity):Promise<any> {
        return await this.axios.post({
            'moodlewsrestformat':'json',
            'wsfunction':'gradereport_user_get_grade_items',
            'wstoken':this.institution.token,
            'courseid':gradeSendingEntity.courseId,
            'userid':gradeSendingEntity.userId
        })
    }

    public async core_enrol_get_users_courses(gradeSendingEntity: GradeSendingEntity): Promise<CourseEnrolledDto[]> {
        let response:any = await this.axios.post({
            'moodlewsrestformat':'json',
            'wsfunction':'core_enrol_get_users_courses',
            'wstoken':this.institution.token,
            'userid':gradeSendingEntity.userId,
            'returnusercount':0
        })

        let coursesEnrolled:CourseEnrolledDto[] = []

        for (let i = 0; i < response.length; i++) {
            const [error,courseEnrolledDto] = CourseEnrolledDto.create(response[i])
            coursesEnrolled.push(courseEnrolledDto!)
        }

        return coursesEnrolled
    }

    public async mod_assign_save_grade(gradeSendingEntity: GradeSendingEntity): Promise<any> {
        return await this.axios.post({
            'wstoken':this.institution.token,
            'wsfunction':'mod_assign_save_grade',
            'moodlewsrestformat':'json',
            'assignmentid':gradeSendingEntity.instanceId,
            'userid':gradeSendingEntity.userId,
            'grade':gradeSendingEntity.scoreToAssign,
            'attemptnumber':'-1',
            'addattempt':0,
            'workflowstate':'graded',
            'applytoall':'0'
        })
    }

    public async core_grades_grader_gradingpanel_point_store(gradeSendingEntity: GradeSendingEntity): Promise<any> {
        console.log(gradeSendingEntity.contextId)
        return await this.axios.post({
            'wstoken':this.institution.token,
            'wsfunction':'core_grades_grader_gradingpanel_point_store',
            'moodlewsrestformat':'json',
            'component':'mod_forum',
            'contextid':gradeSendingEntity.contextId,
            'itemname':'forum',
            'notifyuser':1,
            'gradeduserid':gradeSendingEntity.userId,
            'formdata':`grade=${gradeSendingEntity.scoreToAssign}`
        })
    }
}