const routeTable = {
    '/': './default-route.js',
    '/api': './api-route.js',
}

let loadRoute = (app) => {
    Object.keys(routeTable).forEach((key) => {
        route = require(routeTable[key])
        
        app.loadRoute = ((app, prefix) => {
                        
            return (routeString) => {
                // console.log(prefix)
                // console.log(routeString)
                if (prefix.endsWith('/')) {
                    prefix = prefix.substr(0, prefix.length - 1)
                }
                
                return app.route(`${prefix}${routeString}`)
            }
        })(app, key)
        // app.loadRoute('/')

        route(app)
    })
}

module.exports = loadRoute