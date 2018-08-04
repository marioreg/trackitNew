var authController = require('../controllers/authcontroller.js');
var express    = require('express');
var app        = express();
var path = require("path");



module.exports = function(app,passport){
    app.use(express.static(path.join(__dirname, '/public')));

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);

app.post('/signup', passport.authenticate('local-signup',
{ successRedirect: '/tracking', failureRedirect: '/signup'}
));

//app.get('/dashboard',isLoggedIn, authController.dashboard);
app.get('/tracking',isLoggedIn, authController.tracking);

app.get('/logout',authController.logout);
app.post('/signin', passport.authenticate('local-signin',
{ successRedirect: '/tracking', failureRedirect: '/signin'}
));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}};

