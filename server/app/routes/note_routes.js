const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	const collection = db.collection('wishes');

	app.get('/wishes', (req, res) => {
		collection.find().toArray((err, document) => {
			if (!err) {
				res.send(JSON.stringify(document));
			}
		});
	});

	app.get('/wishes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };

		collection.findOne(details, (err, item) => {
			if (err) {
				res.send({'error': err});
			} else {
				res.send(item);
			}
		});
	});

	app.delete('/wishes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		collection.remove(details, (err, item) => {
			if (err) {
				res.send({'error': err});
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});

	app.put ('/wishes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const note = req.body;

		delete note._id;

		collection.update(details, note, (err, result) => {
			if (err) {
				res.send({'error': err});
			} else {
				res.send(note);
			}
		});
	});

	app.post('/wishes', (req, res) => {
		const body = req.body;
		const note = { ...body };
		collection.insert(note, (err, result) => {
			if (err) {
				res.send({ 'error':  err });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};