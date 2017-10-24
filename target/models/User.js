'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {

	var Schema = _mongoose2.default.Schema;
	var ObjectId = Schema.ObjectId;

	var User = new Schema({
		name: { type: String, unique: true },
		password: { type: String },
		nickname: { type: String }
	});

	$.mongodb.model('User', User);
	$.model.User = $.mongodb.model('User');

	done();
};