const express = require('express');
const app = express();
const myRoute = require('./routes/allRoutes');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect.js');
const background_processes = require('./background_processes/background');

var cors = require('cors')


app.use(express.json());
app.use(bodyParser.json());

app.use(cors())
app.use('/api', myRoute);

app.listen(5000, () => {
    console.log('Application service started on port 5000');
});

// async function main() {
//     const val = await background_processes.backgroundFunction();
//     console.log(val)
// }

// // Call the main function initially
// main();