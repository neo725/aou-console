import states from './_states'

export default {
    Config: config => states.config,
    
    IsLoading: isLoading => states.isLoading,

    Schedules: schedules => states.schedules,
}