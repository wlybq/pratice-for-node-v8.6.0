'use strict';

module.exports = function(done) {

    $.checkLogin = async function(req, res, next) {
        if(!req.session.user || !req.session.logout_token) {
            throw {code: -1, errMsg: '该操作需要登录'};
        }
        next();
    };

    $.checkTopicAuthor = async function (req, res, next) {
        const topic = await $.method('topic.get').call({_id: req.params.topic_id});
        if(!topic) {
            throw {code: -1, errMsg: '帖子不存在或已被删除'};
        }
        if(topic.authorId.toString() !== req.session.user._id.toString()) {
            throw {code: -2, errMsg: '没有操作权限'};
        }
        req.topic = topic;
        next();
    };

    done();

};