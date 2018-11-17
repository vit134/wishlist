const osmosis = require('osmosis');

module.exports = function(app) {
	app.get('/parsing', (req, res) => {
		const url = req.query.url;
		if (url && url !== '') {
			let images = [];
			osmosis
				.get(url)
				.find('meta[property="og:image"]')
				.set({src: '@content'})
				.data(data => {
					if (data) {
						images.push(data);
					}
				})
				.done(() => {
					res.send(images.map(el => {
						return `<img src="${el.src}"/>`
					}).join(''));
				});
		} else {
			res.send('no url param');
		}
	});
};