// Dependencies 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');


// MongoDB
//mongoose.connect('mongodb://localhost/rest_test');
//mongoose.connect('mongodb://GaganMadan:gagan123@ds059306.mlab.com:59306/rest_test');
mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});


// Express
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
//app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// Routes
var api = require('./routes/api')(app, express, io);
app.use('/api', api);

// calling index.html file
app.get('*', function(req,res){
     res.sendfile(__dirname + '/public/app/views/index.html');
 });

// calling register.html file
//app.get('/api/register', function(req,res){
    //res.send("hello");
   //var name = req.body.name;
   //var email = req.body.email;
   //var username = req.body.username;
   //var password = req.body.password;
  // console.log(name);
  //  console.log(password);
//});

//calling the js files
//app.use('/js', express.static(__dirname + '/public/js'));

//calling the npm repository
//app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Start Server
var port = Number(process.env.PORT || 3000 );
http.listen(port);
console.log('API is running on port 3000');
