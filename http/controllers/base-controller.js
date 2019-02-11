const logger = require('../logger')

// var BaseController = function(controllerName) {
//     this.controllerName = controllerName

//     console.log(`BaseController.ctor() for "${this.controllerName}"`)
// }
class BaseController {
    constructor (controllerName) {
        this.ControllerName = controllerName

        console.log(`BaseController.ctor() for "${this.ControllerName}"`)
    }

    ServerError (res, ex) {
        res.status(500)
        res.json({ status: false, code: -500, error: ex })
    }

    BadRequest (res, ex) {
        if (ex.error_in_aou) {
            res.status(400)
            res.json({ status: false, code: -1001, error: ex.message })
        }
        else {
            logger.error(ex)
    
            ServerError(res, ex)
        }
    }
}

module.exports = BaseController