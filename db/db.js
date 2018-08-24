// Set-up db connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://e-commerce-user:password1@ds131932.mlab.com:31932/e-commerce-furniture', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err, ' mongoose failed to connect');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});