'use strict';

import path from "path";
import express from "express";
import serveStatic from "serve-static";
import bodyParser from "body-parser";
import multiparty from "connect-multiparty";
import session from "express-session";

module.exports = function(done) {

	const debug = $.createDebug('init:express');
	debug('init Express...');

	const app = express();
	
	// 配置中间件
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(multiparty());
	app.use(session({
        'secret' : $.config.get('web.session.secret'),
    }));
	// 配置统一返回格式
	app.use((req, res, next) => {
	    res.apiReturn = (code, data) => {
	        res.json({code, successify: code >= 0, result: data});
        };
	    next();
    });

	// 路由配置
	const router = express.Router();
	// $.router = router;

	// 路由异常捕获
    const routerWrap = {};
    ['get', 'head', 'post', 'del', 'delete'].forEach(method => {
        routerWrap[method] = function (path, ...fnList) {
            fnList = fnList.map(fn => {
                return function (req, res, next) {
                    const ret = fn(req, res, next);
                    if(ret.catch) {
                        ret.catch(err => {
                            res.apiReturn(err.code, {errMsg: err.errMsg});
                        });
                    }
                }
            });
            router[method](path, ...fnList);
        }
    });
    $.router = routerWrap;

	app.use(router);
	app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

	// 监听
	app.listen($.config.get('web.port'), (err) => {
		done(err);
	});

}