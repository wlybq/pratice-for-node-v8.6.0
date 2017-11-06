'use strict';

module.exports = function(done) {

	const Schema = $.Schema;
	const ObjectId = $.ObjectId;

	const Topic = new Schema({
        authorId: {type: ObjectId, index: true},
        title: {type: String, trim: true},
        content: {type: String},
        tags: [{type: String, index: true}],
        createdAt: {type: Date, index: true},
        updateedAt: {type: Date, index: true},
        lastCommentedAt: {type: Date, index: true},
        comments: [{
            cid: {type: ObjectId},
            authorId: {type: ObjectId},
            content: {type: String},
            createdAt: {type: Date}
        }]
	});

	$.mongodb.model('Topic', Topic);
	$.model.Topic = $.mongodb.model('Topic');

	done();
};