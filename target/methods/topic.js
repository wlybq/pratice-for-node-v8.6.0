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
        authorId: { require: true, validate: function validate(v) {
                return _validator2.default.isMongoId;
            } },
        title: { require: true },
        content: { require: true },
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
                            params.lastCommentedAt = new Date();
                            topic = new $.model.Topic(params);
                            return _context.abrupt('return', topic.save());

                        case 5:
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
     * @param {Object} 参数说明：_id:MongoId(用户id)
     * @return {Object} 返回添加成功后的值
     * @description 评论获取方法
     */
    $.method('topic.get').check({
        _id: { require: true, validate: function validate(v) {
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
            var query, ret;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            query = {};

                            if (params.authorId) query.authorId = params.authorId;
                            if (params.tags) query.tags = { $all: params.tags };

                            ret = $.model.Topic.find(query, {
                                authorId: 1,
                                title: 1,
                                tags: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                lastCommentedAt: 1
                            });

                            if (params.skip) ret.skip(params.skip);
                            if (params.limit) ret.limit(params.limit);

                            return _context3.abrupt('return', ret);

                        case 7:
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

    done();
};