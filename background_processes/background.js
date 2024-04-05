const { Worker, isMainThread, parentPort } = require('node:worker_threads');
const BackgroundFunctions = require('../background_processes/background_functions')

function backgroundFunction() {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__filename);
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

if (!isMainThread) {
    console.log('Executing background functions...');
    BackgroundFunctions.SendReminderMail();
    //BackgroundFunctions.Migration()
    parentPort.postMessage("background works done!");
} else {
    module.exports = {
        backgroundFunction
    };
}
