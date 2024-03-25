export class InstitutionRegisterDto {
    constructor(
         public uuid: string,
         public name: string,
         public fullName: string,
         public abbreviation: string,
         public domain: string,
         public website: string,
         public restPath: string,
         public modality: string,
         public translations: string,
         public token: string
    ) {}

    static create(object:{[key:string]:any}):[string?,InstitutionRegisterDto?]{
        const {
            uuid,
            name,
            fullname,
            abbreviation,
            domain,
            token,
            website,
            rest_path,
            modality,
            translations
        } = object

        return [
            undefined,
            new InstitutionRegisterDto(
                uuid,
                name,
                fullname,
                abbreviation,
                domain,
                website,
                rest_path,
                modality,
                translations,
                token
            )
        ]
    }
}