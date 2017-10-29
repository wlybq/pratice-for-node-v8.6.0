'use strict';

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _serveStatic = require("serve-static");

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multiparty = require("multiparty");

var _multiparty2 = _interopRequireDefault(_multiparty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (done) {

	var debug = $.createDebug('init:express');
	debug('init Express...');

	var app = (0, _express2.default)();

	// 配置bodyParser
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));

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
					if (ret.catch) ret.catch(next);
				};
			});
			router[method].apply(router, [path].concat(_toConsumableArray(fnList)));
		};
	});
	$.router = routerWrap;

	app.use(router);
	app.use('/static', (0, _serveStatic2.default)(_path2.default.resolve(__dirname, '../../static')));

	app.listen($.config.get('web.port'), function (err) {
		done(err);
	});
};