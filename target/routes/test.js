'use strict';

module.exports = function (done) {
	$.router.get('/', function () {
		res.end('Hello! Welcome');
	});

	done();
};