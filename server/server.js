var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./config');
var route = require('./router/route');
var multer  = require('multer')
let passport = require('passport');
var session = require('express-session')

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null,path.resolve(__dirname, '../client/uploads'));
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({
    storage: Storage
}).single('file'); 
let app = express();
app.set('port', process.env.PORT || config.port); // Set port to 3000 or the provided PORT variable

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();

function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.mongoConnection, options);
}
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

require('./controller/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({ type: 'text/plain' }));

app.use(function (req, res, next) {
    if (req.headers['content-type'] == "text/plain;charset=UTF-8") {
        req.body = JSON.parse(req.body)
    }
    return next();
});

app.use('/api/', route);
app.post('/file', function (req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err)
            return res.end("err");
        }
        return res.send({
            uploadPath:'./uploads/'+req.file.filename,
            filename:req.file.originalname
        });
    });
})

//to load  home  page
app.use('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/register.html'));
});
app.use('/Vacancy', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/job.html'));
});
app.use('/admin',ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/admin.html'));
});
app.use('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login')
}
//for loggin    
app.use(logger('dev'));



module.exports = app;