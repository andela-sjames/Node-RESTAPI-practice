// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_bear_api');

var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  // set our port


// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();  // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('something is about to happen')
    next(); // make usre we go to the next route and don't stop here.
});

router.get('/', function(req, res) {
    res.json({message :'Hello you have successfully made it here......'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================


app.listen(port);
console.log(`server started on port ${port}`);
