/* jshint -W097 */
'use strict';

const http_service_port = 3010

//let exports = module.exports || {}

let getInstance = function() {
    const _instance = {
        // "db": {
        //     "server": db_server,
        //     "server_full": db_server_full,
        //     "database": db_catalog,
        //     "user": db_user_service,
        //     "password": db_password_service,
        //     //"connection_string": `Server=${db_server_full};Initial Catalog=${db_catalog};Persist Security Info=False;User ID=${db_user_service};Password=${db_password_service};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`
        //     "port": db_port,
        // },
        "http-service": {
            "port": http_service_port,
        },
        "api-service": {
            "host": `http://localhost:${http_service_port}/api/`,
            "db": {
                "name": "aou-data"
            }
        }
    }

    return _instance
}

exports['default'] = getInstance()