/* jshint -W097 */
'use strict';

let _ = require('lodash')
let uuidv4 = require('uuid/v4')
let JsonDB = require('node-json-db')
let momentUtil = require('../../moment-util')
const Singleton = require('singleton-class')

class ApiStore extends Singleton {
    constructor(name) {
        super();

        console.log(name)

        this._db = new JsonDB(name, true, true)
        this.name = name
        this.id = uuidv4()
    }

    test() {
        this._db.push("/schedules", [])
    }

    list() {
        try {
            this._db.reload()

            let _list = this._db.getData("/schedules") || []

            _list.forEach((item) => {
                item.start = momentUtil.toString(item.start)
                item.end = momentUtil.toString(item.end)
            })

            return _list
        }
        catch (ex) {
            return []
        }
    }

    get (id) {
        let _list = this.list()

        let index = this.getIndex(_list, id)

        return _list[index]
    }

    getIndex (list, id) {
        //let _list = this.list()

        let index = _.findIndex(list, { id: id })

        if (index == -1) {
            throw {
                error_in_aou: true,
                message: `schedule id "${id}" not exists !`
            }
        }

        return index

        // _list[index] = schedule.toJson()

        // this._db.push("/schedules", _list)

        // return this.list()
    }

    add(schedule) {
        if (!schedule || !schedule.isSchedule) {
            throw {
                error_in_aou: true,
                message: 'schedule not a valid Model'
            }
        }

        schedule.id = uuidv4()

        let _list = this.list()

        // check is same link double with other schedule
        _list.forEach((item) => {
            let isRangeDoubled = true
            
            if (momentUtil.isLower(item.end, schedule.start)) {
                isRangeDoubled = false
            }
            
            if (momentUtil.isLower(item.start, schedule.end)) {
                isRangeDoubled = false
            }

            if (isRangeDoubled == false) {
                // no double, no check needed
                return
            }

            let areEqual = 
                item.link.trim().toUpperCase() == schedule.link.trim().toUpperCase()

            if (areEqual) {
                throw {
                    error_in_aou: true,
                    message: `Link exists in '${item.title}' (${item.start} - ${item.end})`
                }
            }
        })

        _list.push(schedule.toJson())

        this._db.push("/schedules", _list)

        return this.list()
    }

    update(id, schedule) {
        if (!schedule || !schedule.isSchedule) {
            throw {
                error_in_aou: true,
                message: 'schedule not a valid Model'
            }
        }

        let _list = this.list()

        let index = this.getIndex(_list, id)

        _list[index] = schedule.toJson()

        this._db.push("/schedules", _list)

        return _list[index]
    }

    delete(id) {
        let _list = this.list()

        _.remove(_list, { id: id })

        this._db.push("/schedules", _list)
    }
}

module.exports = new ApiStore("aou-data")