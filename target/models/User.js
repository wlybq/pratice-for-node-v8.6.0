'use strict';

module.exports = function (done) {

	var Schema = $.Schema;
	var ObjectId = $.ObjectId;

	var User = new Schema({
		name: { type: String, unique: true },
		password: { type: String },
		nickname: { type: String },
		email: { type: String, unique: true },
		about: { type: String }
	});

	$.mongodb.model('User', User);
	$.model.User = $.mongodb.model('User');

	done();
};