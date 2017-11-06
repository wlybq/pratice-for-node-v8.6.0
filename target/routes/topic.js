'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    /**
     * router Api
     * @type POST
     * @method topic.add
     * @param {Object} title:String（标题）, content:String（内容）, tags:string（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 topic添加成功后的帖子对象
     * @description 帖子添加接口
     */
    $.router.post('/api/topic/add', $.checkLogin, function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var topic;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            req.body.authorId = req.session.user._id;

                            if ('tags' in req.body) {
                                req.body.tags = req.body.tags.split(',').map(function (s) {
                                    return s.trim();
                                }).filter(function (s) {
                                    return s;
                                });
                            }
                            _context.next = 4;
                            return $.method('topic.add').call(req.body);

                        case 4:
                            topic = _context.sent;


                            res.apiReturn(1, { topic: topic });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type GET
     * @method topic.list
     * @param {Object} 参数说明：authorId:MongoId(用户id), tags:String（标签*使用','分隔）, skip:number（帖子条数开始）, limit:number（帖子条数）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description: 获取帖子列表接口
     */
    $.router.get('/api/topic/list', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var list;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:

                            if ('tags' in req.query) {
                                req.query.tags = req.query.tags.split(',').map(function (s) {
                                    return s.trim();
                                }).filter(function (s) {
                                    return s;
                                });
                            }
                            if (!req.query.skip) {
                                req.query.skip = 0;
                            }
                            if (!req.query.limit) {
                                req.query.limit = 10;
                            }
                            req.query.skip = parseInt(req.query.skip);
                            req.query.limit = parseInt(req.query.limit);

                            _context2.next = 7;
                            return $.method('topic.list').call(req.query);

                        case 7:
                            list = _context2.sent;


                            res.apiReturn(1, { list: list });

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type GET
     * @method topic/item/:topic_id
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回值 code为状态值 successify为是否成功 topic帖子详情
     * @description 根据帖子id获取帖子接口
     */
    $.router.get('/api/topic/item/:topic_id', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
            var topic;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return $.method('topic.get').call({ _id: req.params.topic_id });

                        case 2:
                            topic = _context3.sent;

                            if (topic) {
                                _context3.next = 5;
                                break;
                            }

                            throw { code: -1, errMsg: '还没有任何帖子' };

                        case 5:

                            res.apiReturn(1, { topic: topic });

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type POST
     * @method topic/update/:topic_id
     * @param {Object} 参数说明：_id:MongoId（帖子id） title:String（帖子标题） content:String（帖子内容） tags:String（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description 根据帖子id更新帖子接口
     */
    $.router.post('/api/topic/update/:topic_id', $.checkLogin, $.checkTopicAuthor, function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
            var updateResult, topic;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:

                            req.body._id = req.params.topic_id;
                            if ('tags' in req.body) {
                                req.body.tags = req.body.tags.split(',').map(function (s) {
                                    return s.trim();
                                }).filter(function (s) {
                                    return s;
                                });
                            }
                            _context4.next = 4;
                            return $.method('topic.update').call(req.body);

                        case 4:
                            updateResult = _context4.sent;
                            _context4.next = 7;
                            return $.method('topic.get').call({ _id: req.params.topic_id });

                        case 7:
                            topic = _context4.sent;

                            res.apiReturn(1, { updateResult: updateResult, topic: topic });

                        case 9:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        return function (_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type DELETE
     * @method topic/update/:topic_id
     * @param {Object} 参数说明：_id:MongoId（帖子id） title:String（帖子标题） content:String（帖子内容） tags:String（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description 根据帖子id更新帖子接口
     */
    $.router.delete('/api/topic/delete/:topic_id', $.checkLogin, $.checkTopicAuthor, function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
            var topic;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return $.method('topic.delete').call({ _id: req.params.topic_id });

                        case 2:
                            topic = _context5.sent;

                            res.apiReturn(1, { topic: topic });

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type POST
     * @method topic/item/:topic_id/comment/add
     * @param {Object} 参数说明：_id:MongoId(帖子id) authorId（用户id） content（评论内容）
     * @return {Object} 返回添加成功后的值
     * @description 评论添加
     */
    $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
            var comment;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:

                            req.body._id = req.params.topic_id;
                            req.body.authorId = req.session.user._id;

                            _context6.next = 4;
                            return $.method('topic.comment.add').call(req.body);

                        case 4:
                            comment = _context6.sent;

                            res.apiReturn(1, { comment: comment });

                        case 6:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        return function (_x16, _x17, _x18) {
            return _ref6.apply(this, arguments);
        };
    }());

    /**
     * router Api
     * @type POST
     * @method topic/item/:topic_id/comment/delete
     * @param {Object} 参数说明：_id:MongoId(帖子id) cid（评论id）
     * @return {Object} 返回删除成功后的值
     * @description 评论删除
     */
    $.router.post('/api/topic/item/:topic_id/comment/delete', $.checkLogin, $.checkTopicAuthor, function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
            var delRes;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:

                            req.body._id = req.params.topic_id;
                            req.body.authorId = req.session.user._id;

                            _context7.next = 4;
                            return $.method('topic.comment.delete').call(req.body);

                        case 4:
                            delRes = _context7.sent;


                            res.apiReturn(1, { delRes: delRes });

                        case 6:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x19, _x20, _x21) {
            return _ref7.apply(this, arguments);
        };
    }());

    done();
};