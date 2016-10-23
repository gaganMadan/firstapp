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

// calling index.html file
app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html');
});

//calling the js files
app.use('/js', express.static(__dirname + '/public/js'));

//calling the npm repository
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Start Server
var port = Number(process.env.PORT || 3000 );
app.listen(port);
console.log('API is running on port 3000');
