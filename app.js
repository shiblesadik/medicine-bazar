'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const https = require('https');

const authService = require('./services/authentication/authenticationService');
const authRouter = require('./routes/authRoute');
const medicineRouter = require('./routes/medicineRoute');
const medicineController = require('./controllers/medicineController');

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.all('/*', cors(corsOption));
app.use('/api/medicine', medicineRouter);
app.use('/api/auth', authService.verifyLocalToken, authRouter);
app.all('*', authService.verifyJwtToken);

module.exports = app;
