import ConstantsSeeder from "../constants.seeder";

const cronjobSeederData = [
    {
        title: 'Autoscore',
        abbreviation: ConstantsSeeder.cronjob.AUTOSCORE,
        running: false,
        next_run: 1668104373,
        icon: 'fas fa-scroll'
    },
    {
        title: 'Cleaner',
        abbreviation: ConstantsSeeder.cronjob.CLEANER,
        running: false,
        next_run: 1668104373,
        icon: 'fas fa-recycle'
    },
    {
        title: 'Autoscore user not found',
        abbreviation: ConstantsSeeder.cronjob.USERNOTFOUND,
        running: false,
        next_run: 1668104373,
        icon: 'fas fa-user-times'
    }
]

export default cronjobSeederData;