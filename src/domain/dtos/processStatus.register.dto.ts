export class ProcessStatusRegisterDto {
    constructor(
        public uuid: string,
        public process: string,
        public processAbbreviation: string
    ) {}

    static create(object:{[key:string]:any}):[string?,ProcessStatusRegisterDto?]{
        const {
            uuid,
            process,
            process_abbreviation
        } = object

        return [
            undefined,
            new ProcessStatusRegisterDto(
                uuid,
                process,
                process_abbreviation
            )
        ]
    }
}