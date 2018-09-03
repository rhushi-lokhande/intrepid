let passport = require('passport');
const Admin = require('../model/admin');

let loginController = {
    isUserLogin: function (req, res) {
        return res.send(req.isAuthenticated());
    },
    login: function (req, res) {
        console.log('login')
        return passport.authenticate('local', { failureRedirect: '/api/redirecto?msg=Invalid username and password', successRedirect: '/api/redirecto?msg=true' });
    },
    logout: function (req, res) {
        req.logout();
        return res.status(302).send({ url: '/' });
    },
    redirecto: function (req, res) {

        if (!req.query.url) {
            return res.status(req.query.statusCode || 200).send({ msg: req.query.msg });
        }

        return res.status(302).send({ url: req.query.url });
    },
    signUp: async function (req, res) {
        console.log('hi1')
        let admin = await Admin.findOne({ 'username': req.body.username }).exec();
        if (admin) {
            return res.send('This username is already registered');
        }
        console.log('2')

        let newUser = new Admin();
        newUser.username = req.body.username;
        newUser.setPassword(req.body.password);
        await newUser.save(err => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.redirect(`./login?username=${req.body.username}&password=${req.body.password}`)
        });

    }
}
module.exports = loginController;