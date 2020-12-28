'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
const path = require('path').join(__dirname, '/storage');

const authService = require('./services/authentication/authenticationService');
const authRouter = require('./routes/authRoute');
const medicineRouter = require('./routes/medicineRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json());
app.use(express.static(path));

app.all('/*', cors(corsOption));
app.use('/api/medicine', medicineRouter);
app.use('/api/auth', authService.verifyLocalToken, authRouter);
app.all('*', authService.verifyJwtToken);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

module.exports = app;
