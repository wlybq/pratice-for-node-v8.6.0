'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    /**
     * Method
     * @method topic.add
     * @param {Object} 参数说明：authorId:MongoId(用户id), title:String（标题）, content:String（内容）, tags:string（标签*使用','分隔）
     * @return {Object} 返回添加成功后的值
     * @description 帖子添加方法
     */
    $.method('topic.add').check({
        authorId: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId;
            } },
        title: { required: true },
        content: { required: true },
        tags: { validate: function validate(v) {
                return Array.isArray(v);
            } }
    });
    $.method('topic.add').register(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
            var topic;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            params.createdAt = new Date();
                            params.updateedAt = new Date();
                            topic = new $.model.Topic(params);
                            return _context.abrupt('return', topic.save());

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.get
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id获取帖子内容
     */
    $.method('topic.get').check({
        _id: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } }
    });
    $.method('topic.get').register(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', $.model.Topic.findOne({ _id: params._id }));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.list
     * @param {Object} 参数说明：authorId:MongoId(用户id), tags:String（标签*使用','分隔）, skip:number（帖子条数开始）, limit:number（帖子条数）
     * @return {Object} 返回值
     * @description 评论获取方法（列表）
     */
    $.method('topic.list').check({
        authorId: { validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        tags: { validate: function validate(v) {
                return Array.isArray(v);
            } },
        skip: { validate: function validate(v) {
                return v >= 0;
            } },
        limit: { validate: function validate(v) {
                return v > 0;
            } }
    });
    $.method('topic.list').register(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
            var query, queryStr, ret;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            query = {};

                            if (params.authorId) query.authorId = params.authorId;
                            if (params.tags) query.tags = { $all: params.tags };

                            queryStr = {
                                authorId: 1,
                                title: 1,
                                tags: 1,
                                content: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                lastCommentedAt: 1
                            };
                            ret = $.model.Topic.find(query, queryStr);
                            // const ret2 = $.model.Topic.find(query, queryStr);

                            if (params.skip) ret.skip(params.skip);
                            if (params.limit) ret.limit(params.limit);

                            return _context3.abrupt('return', ret);

                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function (_x3) {
            return _ref3.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.delete
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id删除帖子
     */
    $.method('topic.delete').check({
        _id: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } }
    });
    $.method('topic.delete').register(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            return _context4.abrupt('return', $.model.Topic.remove({ _id: params._id }));

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        return function (_x4) {
            return _ref4.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.update
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id删除帖子
     */
    $.method('topic.update').check({
        _id: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        tags: { validate: function validate(v) {
                return Array.isArray(v);
            } }
    });
    $.method('topic.update').register(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(params) {
            var update;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            update = { updateedAt: new Date() };

                            if (params.title) update.title = params.title;
                            if (params.content) update.content = params.content;
                            if (params.tags) update.tags = params.tags;

                            return _context5.abrupt('return', $.model.Topic.update({ _id: params._id }, { $set: update }));

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x5) {
            return _ref5.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.comment.add
     * @param {Object} 参数说明：_id:MongoId(帖子id) authorId（用户id） content（评论内容）
     * @return {Object} 返回添加成功后的值
     * @description 评论添加
     */
    $.method('topic.comment.add').check({
        _id: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        authorId: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        content: { required: true }
    });
    $.method('topic.comment.add').register(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(params) {
            var date, comment, result;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            date = new Date();
                            comment = {
                                cid: new $.utils.ObjectId(),
                                authorId: params.authorId,
                                content: params.content,
                                createdAt: date
                            };
                            result = $.model.Topic.update({ _id: params._id }, { $push: { comments: comment } });
                            return _context6.abrupt('return', result);

                        case 4:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        return function (_x6) {
            return _ref6.apply(this, arguments);
        };
    }());

    /**
     * Method
     * @method: topic.comment.delete
     * @param {Object} 参数说明：_id:MongoId(帖子id) cid（评论id）
     * @return {Object} 返回删除成功后的值
     * @description 评论删除
     */
    $.method('topic.comment.delete').check({
        _id: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        cid: { required: true, validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } }
    });
    $.method('topic.comment.delete').register(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(params) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', $.model.Topic.update({ _id: params._id }, { $pull: { comments: { cid: params.cid } } }));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x7) {
            return _ref7.apply(this, arguments);
        };
    }());

    done();
};