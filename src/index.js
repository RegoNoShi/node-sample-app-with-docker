const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_USER, MONGODB_PWD, MONGODB_IP, MONGODB_PORT } = require('./config');


const mongoURL = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_IP}:${MONGODB_PORT}`;
mongoose
    .connect(mongoURL, {authSource: 'admin', useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((e) => console.log('Unable to connect to MongoDB:', e));

const app = express();
app.get('/', (req, res) => {
    res.send('<h2>Hi there!!</h2>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
