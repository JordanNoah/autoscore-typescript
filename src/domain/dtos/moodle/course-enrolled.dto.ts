export class CourseEnrolledDto {
    constructor(
        public id: number,
        public shortName: string,
        public fullName: string,
        public displayName: string,
        public idNumber: string,
        public visible: number,
        public summary: string,
        public summaryFormat: number,
        public format: string,
        public showGrades: boolean,
        public lang: string,
        public enableCompletion: boolean,
        public completionHasCriteria: boolean,
        public completionUserTracked: boolean,
        public category: number,
        public progress: number,
        public completed: boolean,
        public startDate: number,
        public endDate: number,
        public marker: number,
        public lastAccess: number,
        public isFavourite: boolean,
        public hidden: boolean
    ) {}

    static create(object:{[key:string]:any}):[string?,CourseEnrolledDto?]{
        const {
            id,
            shortname,
            fullname,
            displayname,
            idnumber,
            visible,
            summary,
            summaryformat,
            format,
            showgrades,
            lang,
            enablecompletion,
            completionhascriteria,
            completionusertracked,
            category,
            progress,
            completed,
            startdate,
            enddate,
            marker,
            lastaccess,
            isfavourite,
            hidden
        } = object

        return [
            undefined,
            new CourseEnrolledDto(
                id,
                shortname,
                fullname,
                displayname,
                idnumber,
                visible,
                summary,
                summaryformat,
                format,
                showgrades,
                lang,
                enablecompletion,
                completionhascriteria,
                completionusertracked,
                category,
                progress,
                completed,
                startdate,
                enddate,
                marker,
                lastaccess,
                isfavourite,
                hidden
            )
        ]
    }
}