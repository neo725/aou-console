import moment from 'moment'

export const isDate = (value) => 
    moment(value, 'YYYY-MM-DD', true).isValid()