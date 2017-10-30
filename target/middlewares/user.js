'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    $.checkLogin = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(!req.session.user || !req.session.logout_token)) {
                                _context.next = 2;
                                break;
                            }

                            throw { code: -1, errMsg: '该操作需要登录' };

                        case 2:
                            next();

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
    }();

    $.checkTopicAuthor = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var topic;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return $.method('topic.get').call({ _id: req.params.topic_id });

                        case 2:
                            topic = _context2.sent;

                            if (topic) {
                                _context2.next = 5;
                                break;
                            }

                            throw { code: -1, errMsg: '帖子不存在或已被删除' };

                        case 5:
                            if (!(topic.authorId.toString() !== req.session.user._id.toString())) {
                                _context2.next = 7;
                                break;
                            }

                            throw { code: -2, errMsg: '该操作需要相应的权限' };

                        case 7:
                            req.topic = topic;
                            next();

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
    }();

    done();
};