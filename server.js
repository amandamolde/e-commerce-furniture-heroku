const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');
const session           = require('express-session');
const methodOverride    = require('method-override');
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");
const path = require('path');

// Requrie db
require('./db/db');

// Set view engine for upload test
app.set('view engine', 'ejs');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'react-furniture-store/build')));

// Point back to index.html
app.get('/**', (request, response) => {
	response.sendFile(path.join(__dirname, 'eact-furniture-store/build', 'index.html'));
});

// Use session
app.use(session({
    secret: 'shop small',
    resave: false,
    saveUninitialized: false,
}));

// Set up middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

const corsOptions = {
    origin: 'https://e-commerce-furniture.herokuapp.com/',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(methodOverride('_method'));

// Require contorllers after the middleware
const itemController    = require('./controllers/itemController');
const authController    = require('./controllers/authController');
const uploadController  = require('./controllers/uploadController');
const checkoutController= require('./controllers/checkoutController');
const stripeController  = require('./controllers/stripeController');

app.use('/api/v1/items', itemController);
app.use('/auth/login', authController);
app.use('/', uploadController);
app.use('/checkout', checkoutController);
app.use('/charge', stripeController);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log('API is listening on ' + port);
});