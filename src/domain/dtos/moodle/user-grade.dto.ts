import {GradeItemDto} from "./grade-item.dto";

export class UserGradeDto {
    constructor(
        public courseId: number,
        public courseIdNumber: string,
        public userid: number,
        public userFullName: string,
        public userIdNumber: string,
        public maxDepth: number,
        public gradeItems: GradeItemDto[]
    ) {}

    static create(object:{[key:string]:any}):[string?,UserGradeDto?]{
        const {
            courseid,
            courseidnumber,
            userid,
            userfullname,
            useridnumber,
            maxdepth,
            gradeitems
        } = object

        let gradeItems = []

        for (let i = 0; i < gradeitems.length; i++) {
            const [errorGradeItems,gradeItemsDto] = GradeItemDto.create(gradeitems[i])
            gradeItems.push(gradeItemsDto!)
        }

        return[
            undefined,
            new UserGradeDto(
                courseid,
                courseidnumber,
                userid,
                userfullname,
                useridnumber,
                maxdepth,
                gradeItems
            )
        ]
    }
}