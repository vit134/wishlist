var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Wishes = new Schema({
	userId: String,
	name: String,
	link: String,
	image: String,
	tags: [String],
	category: [String],
	assigned: String
});

class WishesClass {
	get all() {
		return 'bla';
	}
}

Wishes.loadClass(WishesClass);

module.exports = mongoose.model('Wishes', Wishes);