var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

let app = express();
app.set('port', process.env.PORT  || config.port); // Set port to 3000 or the provided PORT variable



app.use(express.static(path.join(__dirname, '../dist')));
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

//to load  home  page
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

//for loggin    
app.use(logger('dev'));

app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}!`);
}); 
