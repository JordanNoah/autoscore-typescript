const Constants = {
    processStatus: {
        WAITING_TO_SEND:'WAITING_TO_SEND',
        UPDATED:'UPDATED',
        INTERNAL_ERROR:'INTERNAL_ERROR',
        SENDED:'SENDED',
        SUCCESSFUL_MOODLE:'SUCCESSFUL_MOODLE',
        MOODLE_ERROR:'MOODLE_ERROR',
        EXISTING_GRADE:'EXISTING_GRADE',
        PROCESSING:'PROCESSING',
        USER_NOT_FOUND:'USER_NOT_FOUND',
        INSTITUTION_NOT_FOUND:'INSTITUTION_NOT_FOUND'
    },
    cronjob:{
        AUTOSCORE:'AUTOSCORE',
        CLEANER: 'CLEANER',
        USERNOTFOUND: 'USERNOTFOUND'
    }
}

export default Constants;