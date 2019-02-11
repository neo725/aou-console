const controller = require('../controllers/api-controller')

module.exports = function(app) {

    app.route('/api')
        .get(controller.helloApi)

    app.route('/api/schedules')
        .get(controller.getScheduleList)
        .post(controller.addSchedule)

    app.route('/api/schedules/:schedule_id')
        .get(controller.getSchedule)
        .put(controller.updateSchedule)
        .delete(controller.deleteSchedule)

}