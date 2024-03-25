import InstitutionSeederData from "../data/institution.seeder.data";
import {InstitutionRegisterDto} from "../../../../domain/dtos/institution.register.dto";
import {InstitutionDatasourceImpl} from "../../../datasources/institution.datasource.impl";
import {InstitutionSequelize} from "../../models/Institution";

export class InstitutionSeederExec {
    public async up() {
        const institutionSeeder = InstitutionSeederData;
        for (let i = 0; i < institutionSeeder.length; i++) {
            const [error,institutionDto] = InstitutionRegisterDto.create(institutionSeeder[i])
            if (error) throw Error(error)
            const institution = institutionDto!
            await new InstitutionDatasourceImpl().register(institution)
        }
    }

    public async down(){
        await InstitutionSequelize.sync({force:true})
    }
}