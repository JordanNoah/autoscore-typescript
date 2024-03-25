import { v4 as uuidV4 } from 'uuid';

const processStatusSeederData = [{
        uuid: uuidV4(),
        process: 'Waiting to send',
        process_abbreviation: 'WAITING_TO_SEND'
    },
    {
        uuid: uuidV4(),
        process: 'Updated',
        process_abbreviation: 'UPDATED'
    },
    {
        uuid: uuidV4(),
        process: 'Internal error',
        process_abbreviation: 'INTERNAL_ERROR'
    },
    {
        uuid: uuidV4(),
        process: 'Sended to moodle',
        process_abbreviation: 'SENDED'
    },
    {
        uuid: uuidV4(),
        process: 'Successful scored to moodle',
        process_abbreviation: 'SUCCESSFUL_MOODLE'
    },
    {
        uuid: uuidV4(),
        process: 'Moodle error',
        process_abbreviation: 'MOODLE_ERROR'
    },
    {
        uuid: uuidV4(),
        process: 'Existing grade',
        process_abbreviation:'EXISTING_GRADE'
    },
    {
        uuid: uuidV4(),
        process: 'Processing',
        process_abbreviation:'PROCESSING'
    },
    {
        uuid: uuidV4(),
        process: 'User not found',
        process_abbreviation:'USER_NOT_FOUND'
    }
]

export default processStatusSeederData;