import {UserGradeDto} from "./user-grade.dto";

export class GradeResponseDto {
    constructor(
        public userGrades: UserGradeDto[],
        public warnings:[]
    ) {}

    static create(object:{[key:string]:any}):[string?,GradeResponseDto?]{
        const {
            usergrades,
            warnings
        } = object

        let userGradesDto = []

        for (let i = 0; i < usergrades.length; i++) {
            const [error,userGradeDto] = UserGradeDto.create(usergrades[i])
            userGradesDto.push(userGradeDto!)
        }

        return [
            undefined,
            new GradeResponseDto(
                userGradesDto,
                warnings
            )
        ]
    }
}