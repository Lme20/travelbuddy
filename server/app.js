var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');

// NOTE: Activities and reviews not implemented in frontend
var activitiesController = require('./controllers/activities');
var checklistController = require('./controllers/checklists');
var journalsController = require('./controllers/journals');
var locationsController = require('./controllers/locations');
var reviewsController = require('./controllers/reviews');
var usersController = require('./controllers/users');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serverTestDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function(err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
}).then(function() {
    console.log(`Connected to MongoDB with URI: ${mongoURI}`); // mistake when forward porting
});

// Create Express app
var app = express();

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP request logger
app.use(morgan('dev'));

// Enable CORS
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

/* CONTROLLERS */
// NOTE: Activities and reviews not implemented in frontend
app.use(activitiesController);
app.use(checklistController);
app.use(journalsController);
app.use(usersController);
app.use(locationsController);
app.use(reviewsController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
app.use(history());

// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when an exception is thrown)
var env = app.get('env');
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
