'use strict';

import mongoose from "mongoose";

module.exports = function(done) {

	const debug = $.createDebug('init:mongodb');
	debug('connecting to MongoDB...');

	const conn = mongoose.createConnection($.config.get('db.mongodb'));
	$.mongodb = conn;
	$.model = {};

	const Schema = mongoose.Schema;
	const ObjectId = Schema.ObjectId;

	$.Schema = Schema;
	$.ObjectId = ObjectId;
	$.utils.ObjectId = mongoose.Types.ObjectId;

	done();
};