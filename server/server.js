var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./config');
var route = require('./router/route');

let app = express();
app.set('port', process.env.PORT  || config.port); // Set port to 3000 or the provided PORT variable

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();

function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.mongoConnection, options);
}


app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({ type: 'text/plain' }));

app.use(function(req, res, next) {
    if (req.headers['content-type'] == "text/plain;charset=UTF-8") {
        req.body = JSON.parse(req.body)
    }
    return next();
});

app.use('/api/',  route);


//to load  home  page
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

//for loggin    
app.use(logger('dev'));



module.exports = app;