'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    /**
     * Method
     * name: User.add
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
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, callback) {
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

                            return _context.abrupt('return', callback({
                                code: -1,
                                errMsg: new Error('name ' + params.name + ' already exists')
                            }));

                        case 6:
                            _context.next = 8;
                            return $.method('user.get').call({ name: params.email });

                        case 8:
                            _user = _context.sent;

                            if (!_user) {
                                _context.next = 11;
                                break;
                            }

                            return _context.abrupt('return', callback({
                                code: -1,
                                errMsg: new Error('name ' + params.name + ' already exists')
                            }));

                        case 11:
                            params.password = $.utils.encryptPassword(params.password.toString());
                            new $.model.User(params).save(callback);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    /**
     * Method
     * name: User.get
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params, callback) {
            var query;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            query = {};

                            if (params._id) {
                                query._id = params._id;
                            } else if (params.name) {
                                query.name = params.name;
                            } else if (params.email) {
                                query.email = params.email;
                            } else {
                                callback({
                                    code: -1,
                                    errMsg: new Error('Please entry your query content [_id|name|email]')
                                });
                            }
                            $.model.User.findOne(query, callback);

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());

    /**
     * Method
     * name: User.update
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
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params, callback) {
            var user, update;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return $.method('user.get').call(params);

                        case 2:
                            user = _context3.sent;

                            if (!user) {
                                callback({
                                    code: -1,
                                    errMsg: new Error('user ' + params.name + ' not exists')
                                });
                            }
                            update = {};

                            if (user.name && user.name !== params.rename) update.name = params.rename;
                            if (user.email && user.email !== params.email) update.email = params.email;
                            if (user.password && !$.utils.validatePassword(params.password, user.password)) update.password = $.utils.encryptPassword(params.password);
                            if (user.nickname && user.nickname !== params.nickname) update.nickname = params.nickname;
                            if (user.about && user.about !== params.about) update.about = params.about;

                            $.model.User.update({ _id: user._id }, { $set: update }, callback);

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }());

    done();
};