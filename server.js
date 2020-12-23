'use strict';

const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
const app = require('./app');

//Start the server
const port = process.env.PORT || 11211;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

const mongodbConnection = require('./mongodb')(server);
