require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const Passport = require('./config/passport');
const cors = require('cors');

//For Swagger Api Documentation for local development
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
// FILE UPLOAD
require('./config/sequelize');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

/**
 * Start 
 * This block of code doesn't make sense
 */
    
    /*
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static("client/build"));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
        });
    }
    */
/**
 * END 
 * This block of code doesn't make sense
 */
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//app.use('/public', express.static(__dirname + '/logo'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
//Connect to mongodb
const passports = Passport();

//api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', function (req, res) {
    res.send({
        "status" : "Server is up and running"
    })
  })

//Routes
require('./routes/User.routes')(app);

const port = process.env.PORT || 5000;  //process.env.port is Heroku's port if you choose to deplay the app there
app.listen(port, () => {
    console.log("Server up and running on port " + port)
});