import { v4 as uuidV4 } from 'uuid';
import ConstantsSeeder from "../constants.seeder";
import constantsSeeder from "../constants.seeder";

const processStatusSeederData = [{
        uuid: uuidV4(),
        process: 'Waiting to send',
        process_abbreviation: ConstantsSeeder.processStatus.WAITING_TO_SEND
    },
    {
        uuid: uuidV4(),
        process: 'Updated',
        process_abbreviation: ConstantsSeeder.processStatus.UPDATED
    },
    {
        uuid: uuidV4(),
        process: 'Internal error',
        process_abbreviation: ConstantsSeeder.processStatus.INTERNAL_ERROR
    },
    {
        uuid: uuidV4(),
        process: 'Sended to moodle',
        process_abbreviation: constantsSeeder.processStatus.SENDED
    },
    {
        uuid: uuidV4(),
        process: 'Successful scored to moodle',
        process_abbreviation: ConstantsSeeder.processStatus.SUCCESSFUL_MOODLE
    },
    {
        uuid: uuidV4(),
        process: 'Moodle error',
        process_abbreviation: constantsSeeder.processStatus.MOODLE_ERROR
    },
    {
        uuid: uuidV4(),
        process: 'Existing grade',
        process_abbreviation: ConstantsSeeder.processStatus.EXISTING_GRADE
    },
    {
        uuid: uuidV4(),
        process: 'Processing',
        process_abbreviation: ConstantsSeeder.processStatus.PROCESSING
    },
    {
        uuid: uuidV4(),
        process: 'User not found',
        process_abbreviation: ConstantsSeeder.processStatus.USER_NOT_FOUND
    },
    {
        uuid: uuidV4(),
        process: 'Institution not found',
        process_abbreviation: ConstantsSeeder.processStatus.INSTITUTION_NOT_FOUND
    }
]

export default processStatusSeederData;