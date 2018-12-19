var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Wishes = require('../models/wishes');
var router = express.Router();
var formidable = require('formidable'),
    util = require('util');



router.post('/images', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        console.log(fields, files);
        res.end(util.inspect({ fields: fields, files: files }));
    });
});

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
    if (!req.user) res.send({error: true, message: 'no user'})
    const userId = String(req.user._id);
    let request = {
        error: false,
        userId
    }

    Wishes.find({userId}, function (err, wishes) {
        if (err) {
            request.error = err;
        }

        request.body = wishes;

        res.send(request);
    });
});

router.post('/wishes', function (req, res) {
    let body = {
        ...req.body,
        userId: String(req.user._id)
    }
    const item = new Wishes({...body})
    item.save().then((data) => res.send(data));
});

router.put('/wishes', function (req, res) {
    Wishes.findById(req.body._id, function (err, wish) {
        if (err) return handleError(err);

        wish.set({...req.body})

        wish.save(function (err, updatedWish) {
            if (err) return handleError(err);
            res.send(updatedWish);
        });
    });
});

router.delete('/wishes', function (req, res) {
    Wishes.deleteMany({ _id: { $in: req.body } }, function (err, resp) {
        if (err) handleError(err);
        res.send(req.body);
    })
});

module.exports = router;