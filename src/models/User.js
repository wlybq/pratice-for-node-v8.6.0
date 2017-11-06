'use strict';


module.exports = function(done) {

	const Schema = $.Schema;
	const ObjectId = $.ObjectId;

	const User = new Schema({
		name: {type: String, unique: true},
		password: {type: String},
		nickname: {type: String},
        email: {type: String, unique: true},
        about: {type: String}
	});

	$.mongodb.model('User', User);
	$.model.User = $.mongodb.model('User');

	done();
};