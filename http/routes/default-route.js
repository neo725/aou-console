const controller = require('../controllers/default-controller')

module.exports = function(app) {

    app.loadRoute('/')
        .get(controller.hello)

    //console.log(app.route('/api'))

}