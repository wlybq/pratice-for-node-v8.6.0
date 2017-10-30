'use strict';

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _serveStatic = require("serve-static");

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectMultiparty = require("connect-multiparty");

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (done) {

				var debug = $.createDebug('init:express');
				debug('init Express...');

				var app = (0, _express2.default)();

				// 配置中间件
				app.use(_bodyParser2.default.json());
				app.use(_bodyParser2.default.urlencoded({ extended: false }));
				app.use((0, _connectMultiparty2.default)());
				app.use((0, _expressSession2.default)({
								'secret': $.config.get('web.session.secret')
				}));
				// 配置统一返回格式
				app.use(function (req, res, next) {
								res.apiReturn = function (code, data) {
												res.json({ code: code, successify: code >= 0, result: data });
								};
								next();
				});

				// 路由配置
				var router = _express2.default.Router();
				// $.router = router;

				// 路由异常捕获
				var routerWrap = {};
				['get', 'head', 'post', 'del', 'delete'].forEach(function (method) {
								routerWrap[method] = function (path) {
												for (var _len = arguments.length, fnList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
																fnList[_key - 1] = arguments[_key];
												}

												fnList = fnList.map(function (fn) {
																return function (req, res, next) {
																				var ret = fn(req, res, next);
																				if (ret.catch) {
																								ret.catch(function (err) {
																												res.apiReturn(err.code, { errMsg: err.errMsg });
																								});
																				}
																};
												});
												router[method].apply(router, [path].concat(_toConsumableArray(fnList)));
								};
				});
				$.router = routerWrap;

				app.use(router);
				app.use('/static', (0, _serveStatic2.default)(_path2.default.resolve(__dirname, '../../static')));

				// 监听
				app.listen($.config.get('web.port'), function (err) {
								done(err);
				});
};