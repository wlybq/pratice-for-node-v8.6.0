'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {

  var Schema = _mongoose2.default.Schema;
  var ObjectId = Schema.ObjectId;

  var Topic = new Schema({
    authorId: { type: ObjectId, index: true },
    title: { type: String, trim: true },
    content: { type: String },
    tags: [{ type: String, index: true }],
    createdAt: { type: Date, index: true },
    updateedAt: { type: Date, index: true },
    lastCommentedAt: { type: Date, index: true },
    comments: [{
      cid: ObjectId,
      authorId: ObjectId,
      content: String,
      createdAt: Date
    }]
  });

  $.mongodb.model('Topic', Topic);
  $.model.Topic = $.mongodb.model('Topic');

  done();
};