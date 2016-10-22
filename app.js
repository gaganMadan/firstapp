// Dependencies 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
//mongoose.connect('mongodb://localhost/rest_test');
mongoose.connect('mongodb://GaganMadan:gagan123@ds059306.mlab.com:59306/rest_test');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Start Server
var port = Number(process.env.PORT || 3000 );
app.listen(port);
console.log('API is running on port 3000');
