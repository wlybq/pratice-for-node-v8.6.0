'use strict';

module.exports = function(done) {

    /**
     * router Api
     * type: GET
     * name: login
     * desc: 登录接口
     */
    $.router.get('/api/login_user', async function(req, res, next) {
        if(!req.session.logout_token) throw {code: -1, errMsg: '还没有任何用户登录'}
        res.apiReturn(1, {user: req.session.user, token: req.session.logout_token});
    });

    /**
     * router Api
     * type: POST
     * name: login
     * desc: 登录接口
     */
    $.router.post('/api/login', async function(req, res, next) {

        const user = await $.method('user.get').call(req.body);

        // 验证
        if(!user) {
            throw {code: -1, errMsg: `用户${req.body.name}不存在`};
        }
        if(!req.body.password || !$.utils.validatePassword(req.body.password, user.password)) {
           throw {
               code: -1,
               errMsg: '密码不正确'
           }
        }

        req.session.user = user;
        req.session.logout_token = $.utils.randomString(20);

        // 成功返回值
        res.apiReturn(1, {token: req.session.logout_token});
    });

    /**
     * router Api
     * type: GET
     * name: logout
     * desc: 登出接口
     */
    $.router.get('/api/logout', async function(req, res, next) {
        if(!req.query.token) {
            throw {
                code: -1,
                errMsg: 'token参数缺失'
            }
        }
        if(req.session.logout_token && req.query.token !== req.session.logout_token) {
            throw {
                code: -2,
                errMsg: '没有可以退出的用户'
            }
        }

        delete req.session.user;
        delete req.session.logout_token;

        res.apiReturn(1, {});
    });

    /**
     * router Api
     * type: POST
     * name: signup
     * desc: 注册接口
     */
    $.router.post('/api/signup', async function(req, res, next) {
        const user = await $.method('user.add').call(req.body);
        res.apiReturn(1, {user});
    });

    done();
}