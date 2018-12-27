var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Wishes = require('../models/wishes');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var mongoose = require('mongoose');

var moveFile = require('../utils');

router.post('/images', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var tmpPath = files.file.path;
        /* var newPath = './uploads/' + files.file.name;
        
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', (e) => console.log('readStream error', e));
        writeStream.on('error', (e) => console.log('writeStream error', e));

        readStream.on('close', function () {
            fs.unlink(oldPath, () => console.log('unlink success'));
        });

        readStream.pipe(writeStream); */

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
    /* let path = "./uploads";

    fs.lstat(path, (err, stats) => {

        if (err)
            return console.log(err); //Handle error

        console.log(`Is file: ${stats.isFile()}`);
        console.log(`Is directory: ${stats.isDirectory()}`);
        console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
        console.log(`Is FIFO: ${stats.isFIFO()}`);
        console.log(`Is socket: ${stats.isSocket()}`);
        console.log(`Is character device: ${stats.isCharacterDevice()}`);
        console.log(`Is block device: ${stats.isBlockDevice()}`);
    }); */
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