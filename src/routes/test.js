'use strict';

module.exports = function(done) {
	
	$.router.get('/', async function(req, res) {
		res.end('Hello! Welcome');
	});

	done();
};