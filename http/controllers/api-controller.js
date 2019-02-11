'use strict';
const colors = require('colors')
const snakeCaseKeys = require('snakecase-keys')
const logger = require('../logger')
const BaseController = require('./base-controller')

const store = require('../stores/api-store')
const Schedule = require('../models/schedule')

class ApiController extends BaseController {
    constructor () {
        super("ApiController")

        // return {
        //     helloApi: function(req, res) {
        //         //store.test()
        //         res.json({ message: `hello api : ${store.id}` })
        //     },
        //     getScheduleList: function(req, res) {
        //         let _list = store.list()
    
        //         res.json(_list)
        //     },
        //     addSchedule: addSchedule
        // }
    }

    helloApi (req, res) {
        //store.test()
        res.json({ message: `hello api : ${store.id}` })
    }

    getScheduleList (req, res) {
        let _list = store.list()

        res.json(_list)
    }

    getSchedule (req, res) {
        try {
            res.json(store.get(req.params.schedule_id))
        }
        catch (ex) {
            super.BadRequest(res, ex)
        }
    }

    addSchedule (req, res) {
        try {
            let schedule = new Schedule().ParseFromRequest(req)

            let _list = store.add(schedule)

            res.json(_list)
        }
        catch (ex) {
            // console.error(ex)            
            super.BadRequest(res, ex)
        }
    }

    updateSchedule (req, res) {
        try {
            let schedule_id = req.params.schedule_id

            let schedule = new Schedule().ParseFromRequest(req)

            res.json(store.update(schedule_id, schedule))
        }
        catch (ex) {
            super.BadRequest(res, ex)
        }
    }

    deleteSchedule (req, res) {
        try {
            let schedule_id = req.params.schedule_id

            res.json(store.delete(schedule_id))
        }
        catch (ex) {
            super.BadRequest(res, ex)
        }
    }
}

module.exports = new ApiController()