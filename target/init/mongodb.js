'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {

	var debug = $.createDebug('init:mongodb');
	debug('connecting to MongoDB...');

	var conn = _mongoose2.default.createConnection($.config.get('db.mongodb'));
	$.mongodb = conn;
	$.model = {};

	var Schema = _mongoose2.default.Schema;
	var ObjectId = Schema.ObjectId;

	$.Schema = Schema;
	$.ObjectId = ObjectId;
	$.utils.ObjectId = _mongoose2.default.Types.ObjectId;

	done();
};