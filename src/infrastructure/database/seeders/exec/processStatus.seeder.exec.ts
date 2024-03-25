import ProcessStatusSeederData from "../data/processStatus.seeder.data";
import {ProcessStatusRegisterDto} from "../../../../domain/dtos/processStatus.register.dto";
import {ProcessStatusDatasourceImpl} from "../../../datasources/processStatus.datasource.impl";
import {ProcessStatusSequelize} from "../../models/ProcessStatus";

export class ProcessStatusSeederExec {
    public async up() {
        const processStatusSeeder = ProcessStatusSeederData;
        for (let i = 0; i < processStatusSeeder.length; i++){
            const [error, processStatusDto] = ProcessStatusRegisterDto.create(processStatusSeeder[i])
            if (error) throw Error(error)
            const processStatus = processStatusDto!
            await new ProcessStatusDatasourceImpl().register(processStatus)
        }
    }

    public async down() {
        await ProcessStatusSequelize.sync({force:true})
    }
}