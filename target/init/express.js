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

module.exports = function (done) {

	var app = (0, _express2.default)();

	// 配置bodyParser
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));

	// 路由配置
	var router = _express2.default.Router();
	$.router = router;

	app.use(router);
	app.use('/static', (0, _serveStatic2.default)(_path2.default.resolve(__dirname, '../../static')));

	app.listen($.config.get('web.port'), function (err) {
		done(err);
	});
};