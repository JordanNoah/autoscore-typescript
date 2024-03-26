export class CronjobRegisterDto {
    constructor(
        public title: string,
        public abbreviation: string,
        public running: boolean,
        public nextRun: number,
        public icon: string
    ) {}

    static create(object:{[key:string]:any}):[string?,CronjobRegisterDto?]{
        const {
            title,
            abbreviation,
            running,
            next_run,
            icon
        } = object

        return [
            undefined,
            new CronjobRegisterDto(
                title,
                abbreviation,
                running,
                next_run,
                icon
            )
        ]
    }
}