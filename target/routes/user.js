'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    /**
     * router Api
     * type: GET
     * name: login
     * desc: 登录接口
     */
    $.router.get('/api/login_user', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (req.session.logout_token) {
                                _context.next = 2;
                                break;
                            }

                            throw { code: -1, errMsg: '还没有任何用户登录' };

                        case 2:
                            res.apiReturn(1, { user: req.session.user, token: req.session.logout_token });

                        case 3:
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
     * type: POST
     * name: login
     * desc: 登录接口
     */
    $.router.post('/api/login', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return $.method('user.get').call(req.body);

                        case 2:
                            user = _context2.sent;

                            if (user) {
                                _context2.next = 5;
                                break;
                            }

                            throw { code: -1, errMsg: '\u7528\u6237' + req.body.name + '\u4E0D\u5B58\u5728' };

                        case 5:
                            if (!(!req.body.password || !$.utils.validatePassword(req.body.password, user.password))) {
                                _context2.next = 7;
                                break;
                            }

                            throw {
                                code: -1,
                                errMsg: '密码不正确'
                            };

                        case 7:

                            req.session.user = user;
                            req.session.logout_token = $.utils.randomString(20);

                            // 成功返回值
                            res.apiReturn(1, { token: req.session.logout_token });

                        case 10:
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
     * type: GET
     * name: logout
     * desc: 登出接口
     */
    $.router.get('/api/logout', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (req.query.token) {
                                _context3.next = 2;
                                break;
                            }

                            throw {
                                code: -1,
                                errMsg: 'token参数缺失'
                            };

                        case 2:
                            if (!(req.session.logout_token && req.query.token !== req.session.logout_token)) {
                                _context3.next = 4;
                                break;
                            }

                            throw {
                                code: -2,
                                errMsg: '没有可以退出的用户'
                            };

                        case 4:

                            delete req.session.user;
                            delete req.session.logout_token;

                            res.apiReturn(1, {});

                        case 7:
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
     * type: POST
     * name: signup
     * desc: 注册接口
     */
    $.router.post('/api/signup', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
            var user;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return $.method('user.add').call(req.body);

                        case 2:
                            user = _context4.sent;

                            res.apiReturn(1, { user: user });

                        case 4:
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

    done();
};