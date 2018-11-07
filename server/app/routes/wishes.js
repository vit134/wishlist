var express = require('express');
var Wishes = require('../models/wishes');
var router = express.Router();

router.get('/wishes', function (req, res) {
	res.send('bla')
});

module.exports = router;