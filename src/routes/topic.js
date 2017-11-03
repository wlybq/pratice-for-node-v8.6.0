'use strict';

module.exports = function(done) {

    /**
     * router Api
     * @type POST
     * @method topic.add
     * @param {Object} title:String（标题）, content:String（内容）, tags:string（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 topic添加成功后的帖子对象
     * @description 帖子添加接口
     */
    $.router.post('/api/topic/add', $.checkLogin, async function (req, res, next) {

        req.body.authorId = req.session.user._id;

        if('tags' in req.body) {
            req.body.tags = req.body.tags.split(',').map(s => s.trim()).filter(s => s);
        }
        const topic = await $.method('topic.add').call(req.body);

        res.apiReturn(1, {topic});

    });

    /**
     * router Api
     * @type GET
     * @method topic.list
     * @param {Object} 参数说明：authorId:MongoId(用户id), tags:String（标签*使用','分隔）, skip:number（帖子条数开始）, limit:number（帖子条数）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description: 获取帖子列表接口
     */
    $.router.get('/api/topic/list', async function (req, res, next) {

        if('tags' in req.query) {
            req.query.tags = req.query.tags.split(',').map(s => s.trim()).filter(s => s);
        }
        if(!req.query.skip) {
            req.query.skip = 0;
        }
        if(!req.query.limit) {
            req.query.limit = 10;
        }
        req.query.skip = parseInt(req.query.skip);
        req.query.limit = parseInt(req.query.limit);

        const list = await $.method('topic.list').call(req.query);

        res.apiReturn(1, {list});

    });

    /**
     * router Api
     * @type GET
     * @method topic/item/:topic_id
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回值 code为状态值 successify为是否成功 topic帖子详情
     * @description 根据帖子id获取帖子接口
     */
    $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

        const topic = await $.method('topic.get').call({_id: req.params.topic_id});

        if(!topic) throw {code: -1, errMsg: '还没有任何帖子'};

        res.apiReturn(1, {topic});

    });

    /**
     * router Api
     * @type POST
     * @method topic/update/:topic_id
     * @param {Object} 参数说明：_id:MongoId（帖子id） title:String（帖子标题） content:String（帖子内容） tags:String（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description 根据帖子id更新帖子接口
     */
    $.router.post('/api/topic/update/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

        req.body._id = req.params.topic_id;
        if('tags' in req.body) {
            req.body.tags = req.body.tags.split(',').map(s => s.trim()).filter(s => s);
        }
        const updateResult = await $.method('topic.update').call(req.body);
        const topic = await $.method('topic.get').call({_id: req.params.topic_id});
        res.apiReturn(1, {updateResult, topic});

    });

    /**
     * router Api
     * @type DELETE
     * @method topic/update/:topic_id
     * @param {Object} 参数说明：_id:MongoId（帖子id） title:String（帖子标题） content:String（帖子内容） tags:String（标签*使用','分隔）
     * @return {Object} 返回值 code为状态值 successify为是否成功 list帖子列表
     * @description 根据帖子id更新帖子接口
     */
    $.router.delete('/api/topic/delete/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

        const topic = await $.method('topic.delete').call({_id: req.params.topic_id});
        res.apiReturn(1, {topic});

    });

    done();
};