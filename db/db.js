// Set-up db connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://superuser:password01@ds131902.mlab.com:31902/heroku_f9hpgb2g', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err, ' mongoose failed to connect');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});