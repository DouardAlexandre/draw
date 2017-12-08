// Create Controller for Authentication
//To control access between views and models, we will create Controller for authentication.
 //This is just implementing basic MVC pattern.


 var mongoose = require("mongoose");
 var passport = require("passport");
 var User = require("../models/User");

 var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

//flash message
//passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};
userController.game = function(req, res) {
  res.render('game');
};
// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;