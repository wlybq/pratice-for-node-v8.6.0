'use strict';

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _projectCore = require("project-core");

var _projectCore2 = _interopRequireDefault(_projectCore);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = global.$ = new _projectCore2.default();

// 设置debugger
$.createDebug = function (name) {
	return (0, _debug2.default)('my:' + name);
};
var debug = $.createDebug('server');

// 加载配置文件
$.init.add(function (done) {

	$.config.load(_path2.default.resolve(__dirname, 'config.js'));
	var env = process.env.NODE_ENV || null;
	if (env) {
		debug('load env %s', env);
		$.config.load(_path2.default.resolve(__dirname, '../config', env + '.js'));
	}
	$.env = env;
	done();
});

// 初始化MongoDB
$.init.load(_path2.default.resolve(__dirname, 'init', 'mongodb.js'));

// 加载model
$.init.load(_path2.default.resolve(__dirname, 'models'));

// 加载methods
$.init.load(_path2.default.resolve(__dirname, 'methods'));

// 初始化Express
$.init.load(_path2.default.resolve(__dirname, 'init', 'express.js'));

// 加载路由
$.init.load(_path2.default.resolve(__dirname, 'routes'));

// 初始化
$.init(function (err) {

	if (err) {
		console.error(err);
		process.exit(-1);
	} else {
		console.log('inited');
	}

	// require('./test');
});