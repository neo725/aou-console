import moment from 'moment'

export const GreaterThenValidator = () => {
    return (value, component) => { 
        // debugger
        
        let start = moment(component.start, 'YYYY-MM-DD').startOf('day')
        let end = moment(component.end, 'YYYY-MM-DD').startOf('day')

        return end.diff(start, 'days') >= 0
    }
}