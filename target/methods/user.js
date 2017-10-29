'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    /**
     * Method
     * name: User.add
     * desc: 用户添加方法
     */
    $.method('user.add').check({
        name: { required: true, validate: function validate(v) {
                return _validator2.default.isLength(v, { min: 6, max: 36 }) && /^[a-zA-Z]/.test(v);
            } },
        email: { required: true, validate: function validate(v) {
                return _validator2.default.isEmail(v);
            } },
        password: { required: true, validate: function validate(v) {
                return _validator2.default.isLength(v, { min: 6, max: 36 });
            } }
    });
    $.method('user.add').register(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
            var user, _user;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            params.name = params.name.toLowerCase();

                            _context.next = 3;
                            return $.method('user.get').call({ name: params.name });

                        case 3:
                            user = _context.sent;

                            if (!user) {
                                _context.next = 6;
                                break;
                            }

                            throw {
                                code: -1,
                                errMsg: '\u7528\u6237' + params.name + '\u5DF2\u7ECF\u5B58\u5728'
                            };

                        case 6:
                            _context.next = 8;
                            return $.method('user.get').call({ email: params.email });

                        case 8:
                            _user = _context.sent;

                            if (!_user) {
                                _context.next = 11;
                                break;
                            }

                            throw {
                                code: -2,
                                errMsg: '\u90AE\u7BB1' + params.email + '\u5DF2\u7ECF\u5B58\u5728'
                            };

                        case 11:

                            params.password = $.utils.encryptPassword(params.password.toString());
                            return _context.abrupt('return', new $.model.User(params).save());

                        case 13:
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
     * name: User.get
     * desc: 获取用户方法
     */
    $.method('user.get').check({
        _id: { validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        name: { validate: function validate(v) {
                return _validator2.default.isLength(v, { min: 6, max: 36 }) && /^[a-zA-Z]/.test(v);
            } },
        email: { validate: function validate(v) {
                return _validator2.default.isEmail(v);
            } }
    });
    $.method('user.get').register(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
            var query;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            query = {};

                            if (!params._id) {
                                _context2.next = 5;
                                break;
                            }

                            query._id = params._id;
                            _context2.next = 14;
                            break;

                        case 5:
                            if (!params.name) {
                                _context2.next = 9;
                                break;
                            }

                            query.name = params.name;
                            _context2.next = 14;
                            break;

                        case 9:
                            if (!params.email) {
                                _context2.next = 13;
                                break;
                            }

                            query.email = params.email;
                            _context2.next = 14;
                            break;

                        case 13:
                            throw {
                                code: -1,
                                errMsg: 'Please entry your query content [_id|name|email]'
                            };

                        case 14:
                            return _context2.abrupt('return', $.model.User.findOne(query));

                        case 15:
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
     * name: User.update
     * desc: 用户信息修改方法
     */
    $.method('user.update').check({
        _id: { validate: function validate(v) {
                return _validator2.default.isMongoId(v);
            } },
        name: { validate: function validate(v) {
                return _validator2.default.isLength(v, { min: 6, max: 36 }) && /^[a-zA-Z]/.test(v);
            } },
        email: { validate: function validate(v) {
                return _validator2.default.isEmail(v);
            } }
    });
    $.method('user.update').register(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
            var user, update;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return $.method('user.get').call(params);

                        case 2:
                            user = _context3.sent;

                            if (user) {
                                _context3.next = 5;
                                break;
                            }

                            throw {
                                code: -1,
                                errMsg: 'user ' + params.name + ' not exists'
                            };

                        case 5:
                            update = {};

                            if (user.name && user.name !== params.rename) update.name = params.rename;
                            if (user.email && user.email !== params.email) update.email = params.email;
                            if (user.password && !$.utils.validatePassword(params.password, user.password)) update.password = $.utils.encryptPassword(params.password);
                            if (user.nickname && user.nickname !== params.nickname) update.nickname = params.nickname;
                            if (user.about && user.about !== params.about) update.about = params.about;

                            return _context3.abrupt('return', $.model.User.update({ _id: user._id }, { $set: update }));

                        case 12:
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