let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Admin = require('../model/admin');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});




passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('inside local statergy', username);
        console.log(username, password);
        Admin.findOne({ username: username }, function (err, user) {
            console.log('find user ');
            console.log(err, user);
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));