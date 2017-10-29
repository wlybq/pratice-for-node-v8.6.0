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

                            console.log(req.body);

                            req.body.authorId = req.session.user._id;

                            if ('tags' in req.body) {
                                req.body.tags = req.body.tags.split(',').map(function (s) {
                                    return s.trim();
                                }).filter(function (s) {
                                    return s;
                                });
                            }
                            _context.next = 5;
                            return $.method('topic.add').call(req.body);

                        case 5:
                            topic = _context.sent;


                            res.json({
                                code: 1,
                                successify: true,
                                topic: topic
                            });

                        case 7:
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
                            _context2.next = 3;
                            return $.method('topic.list').call(req.query);

                        case 3:
                            list = _context2.sent;


                            res.json({
                                code: 1,
                                successify: true,
                                list: list
                            });

                        case 5:
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
     * @method topic.get
     * @param {Object} 参数说明：_id:MongoId(用户id)
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description 获取帖子接口
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

                            res.json({
                                code: 1,
                                successify: true,
                                topic: topic
                            });

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

    done();
};