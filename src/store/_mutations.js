export default {
    setLoading(state) {
        state.isLoading = true
    },
    clearLoading(state) {
        state.isLoading = false
    },
    setSchedules(state, list) {
        state.schedules = list
    }
}