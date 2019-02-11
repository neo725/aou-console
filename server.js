'use strict'

let config = require('./config')
let logger = require('./http/logger')

if (config['default']) config = config['default']

let express = require('express'),
    cors = require('cors'),
    proxy = require('express-http-proxy'),
    app = express(),
    server = require('http').createServer(app),
    //port = process.env.PORT || process.env.NODE_ENV == 'production' ? 8018 : 3010,
    port = process.env.PORT || config["http-service"].port,
    bodyParser = require('body-parser'),
    { nextAvailable } = require('node-port-check')

// initialize setting
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// proxy
//app.use(express.static('./'))
//app.use('/', proxy('localhost:8081'))

// initialize route mapping to which controller
var route = require('./http/routes/api-route')
route(app)

// set server port
try {

    nextAvailable(port, '0.0.0.0').then(nextAvailablePort => {
        if (nextAvailablePort != port) {
            console.log(`Port : ` + ` ${port} `.bgRed.white + ' not available.')
            console.log('')
            console.log('aou-api server not running !!'.bgRed.white)
            return
        }

        server.listen(port)

        console.log(` aou-api server run on : ` + ` ${port} `.bgGreen.black)
        logger.info(`aou-api server run on : ` + ` ${port} `)
    })
}
catch (ex) {
    console.log(ex)
}