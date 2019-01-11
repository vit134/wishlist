var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Wishes = require('../models/wishes');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var mongoose = require('mongoose');

var nodemailer = require('nodemailer');

const Utils = require('../utils');

var moveFile = Utils.renameFile;
var sendMail = Utils.sendMail;

router.post('/images', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var tmpPath = files.file.path;
        res.send({ tmpPath })
    });
});

router.delete('/images', function (req, res) {
    const path = req.body.tmpPath;

    fs.unlink(path, (err) => {
        if (err) res.status(400).send({err})
        res.send({status: 'success', message: 'unlink success'})
    }
    );
});

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    var {username, password, email} = req.body;
    var mailOptions = {
        from: 'vit134256@gmail.com',
        to: email,
        subject: 'Activation code',
        text:
            `Hello dear ${username},
            for activate your account go to the link 
            http://localhost:8888/activate?user=${username}`
    };

    sendMail(mailOptions)
        .then(() => {
            Account.register(new Account({ username, email }), password, function (error, account) {
                if (error) {
                    return res.status(400).send({ status: 'error', error, account })
                }

                passport.authenticate('local')(req, res, function () {
                    res.send({ status: 'success', user: req.user })
                });
            });
        })
        .catch(e => res.status(400).send({error: e, code: 'not_send_mail'}))
});

router.get('/activate', function (req, res) {
    const { user } = req.query;
    
    Account.findOne({ username: user })
        .then(account => {
            account.set({ is_activate: true, online: true, last_login: new Date() })
            account.save().then((data) => res.send(data));
        })
});

router.get('/login', function(req, res) {
	res.send({ user : req.user ? req.user : false });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    var query = {
        'username': req.user.username
    };
    var update = {
        last_login: Date.now(),
        online: true
    };
    var options = {
        new: true
    };
    Account.findOneAndUpdate(query, update, options, function (err, user) {
        if (err) {
            console.log(err);
        }
    });
    // if login is successfull, the following message will be displayed
	res.send({user: req.user});
});

router.get('/logout', function(req, res) {
    var query = {
        'username': req.user.username
    };

    req.logout();

    var update = {
        last_login: Date.now(),
        online: false
    };
    var options = {
        new: true
    };
    Account.findOneAndUpdate(query, update, options, function (err, user) {
        if (err) {
            console.log(err);
        }
        res.send({ user: req.user })
    });
});

router.get('/user-info', function(req, res) {
    const userId = String(req.query.user);
    if (mongoose.Types.ObjectId.isValid(userId)) {
        Account.findOne({ userId })
            .then(acc => {
                res.send(acc);
            })
            .catch(err => res.status(400).send(err))
    } else {
        Account.findOne({ username: userId })
            .then(acc => {
                res.send(acc);
            })
            .catch(err => res.status(400).send(err))
    }
});

router.get('/wishes', function (req, res) {
    //if (!req.user) res.send({error: true, message: 'no user'})

    const userId = String(req.query.user);
    let request = {
        error: false,
        userId
    }
    
    if (mongoose.Types.ObjectId.isValid(userId)) {
        Wishes.find({ userId: userId }, function (err, wishes) {
            if (err) {
                request.error = err;
            }

            request.body = wishes;

            res.send(request);
        });
    } else {
        Account.findOne({username: userId})
            .then(acc => {
                const id = acc._id;
                return Wishes.find({ userId: id })
            })
            .then(wishes => {
                request.body = wishes;

                res.send(request);
            })
            .catch(err => res.status(400).send({error: true, message: err}))
    }
});

router.post('/wishes', async function (req, res) {
    let body = {
        ...req.body,
        userId: String(req.user._id),
        assigned: ''
    }

    if (req.body.image) {
        let name = await moveFile(req.body.image[0].response.tmpPath, req.body.image[0]);
        body.image = name;
    }
    
    item = new Wishes({...body})
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