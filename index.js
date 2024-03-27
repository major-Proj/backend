const path = require('path')
const express = require('express');
const app = express();
const myRoute = require('./routes/allRoutes');
const bodyParser = require('body-parser');
const db = require('./db/connect');

var cors = require('cors')
app.use((req, res, next) => {
    req.db = db;
    next();
  });

app.use(express.json());
app.use(bodyParser.json());

app.use(cors())
app.use('/api', myRoute);

app.listen(3000, () => {
    console.log('Application service started on port 3000');
});