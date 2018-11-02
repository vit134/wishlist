var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
	var {username, password, firstname, lastname} = req.body;

    Account.register(new Account({ username, firstname, lastname  }), password, function(error, account) {
        if (error) {
			return res.send({status: 'error', error, account})
        }

        passport.authenticate('local')(req, res, function () {
            res.send({status: 'success', user: req.user})
        });
    });
});

router.get('/login', function(req, res) {
	res.send({ user : req.user ? req.user : false });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.send({user: req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send({user: req.user})
});

module.exports = router;