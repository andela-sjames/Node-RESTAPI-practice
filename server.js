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
    next(); // make user go to the next route and don't stop here.
});

router.get('/', function(req, res) {
    res.json({message :'Hello you have successfully made it here......'});
});

// more routes for our API will happen here


// on routes that end in /bears
// ----------------------------------------------------

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: `Bear created! ${req.body.name}` });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------

router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res){

        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            res.json(bear);
        })
    })

    .put(function(req, res){

        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            bear.name = req.body.name;


            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: `Bear updated! ${req.body.name}` });
            });
        });
    })

    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

             res.json({ message: 'Successfully deleted' });
        })

    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`server started on port ${port}`);
