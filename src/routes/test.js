'use strict';

module.exports = function(done) {
	
	$.router.get('/', function(req, res) {
		res.end('Hello! Welcome');
	});

	done();
}