var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Wishes = require('../models/wishes');
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

router.get('/wishes', function (req, res) {
    let request = {
        error: false,
    }
    console.log(req.user)
    Wishes.find(function (err, wishes) {
        if (err) {
            request.error = err;
        }

        request.body = wishes
        res.send(request);
    });
});

router.post('/wishes', function (req, res) {
    const item = new Wishes({...req.body, userId: req.user.id})
    item.save().then((data) => res.send(data));
});

module.exports = router;