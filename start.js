'use strict'
const { exec } = require('child_process')
//var runSequence = require('run-sequence')

let runServer = () => {
    exec('npm run server', (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return
        }

        if (stderr) {
            console.log('stderr :')
            console.log(stderr)
        }
        // the *entire* stdout and stderr (buffered)
        console.log('stdout :')
        console.log(stdout)
    })
}

let runBuild = () => {
    exec('npm run build', (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return
        }
    
        if (stderr) {
            console.log('stderr :')
            console.log(stderr)
        }
        // the *entire* stdout and stderr (buffered)
        console.log('stdout:')
        console.log(stdout)

        // console.log(`stderr: ${stderr}`);
        setTimeout(runServer, 3000)
    })
}

runBuild()