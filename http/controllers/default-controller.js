'use strict';
const colors = require('colors')
const snakeCaseKeys = require('snakecase-keys')

const store = require('../stores/default-store')

let controller = function() {
    
    return {
        hello: function(req, res) {
            console.log('run hello'.yellow)

            res.json({ message: 'hello world' })
        }
    }
}

module.exports = controller()