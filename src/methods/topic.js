'use strict';

import validator from 'validator';

module.exports = function (done) {

    /**
     * Method
     * @method topic.add
     * @param {Object} 参数说明：authorId:MongoId(用户id), title:String（标题）, content:String（内容）, tags:string（标签*使用','分隔）
     * @return {Object} 返回添加成功后的值
     * @description 帖子添加方法
     */
    $.method('topic.add').check({
        authorId: {required: true, validate: v => validator.isMongoId},
        title: {required: true},
        content: {required: true},
        tags: {validate: v => Array.isArray(v)}
    });
    $.method('topic.add').register(async function (params) {

        params.createdAt = new Date();
        params.updateedAt = new Date();
        const topic = new $.model.Topic(params);

        return topic.save();

    });

    /**
     * Method
     * @method: topic.get
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id获取帖子内容
     */
    $.method('topic.get').check({
        _id: {required: true, validate: v => validator.isMongoId(v)}
    });
    $.method('topic.get').register(async function (params) {

        return $.model.Topic.findOne({_id: params._id});

    });

    /**
     * Method
     * @method: topic.list
     * @param {Object} 参数说明：authorId:MongoId(用户id), tags:String（标签*使用','分隔）, skip:number（帖子条数开始）, limit:number（帖子条数）
     * @return {Object} 返回值
     * @description 评论获取方法（列表）
     */
    $.method('topic.list').check({
        authorId: {validate: v => validator.isMongoId(v)},
        tags: {validate: v => Array.isArray(v)},
        skip: {validate: v => v >= 0},
        limit: {validate: v => v > 0}
    });
    $.method('topic.list').register(async function (params) {

        const query = {};
        if(params.authorId) query.authorId = params.authorId;
        if(params.tags) query.tags = {$all: params.tags};

        const queryStr = {
            authorId: 1,
            title: 1,
            tags: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            lastCommentedAt: 1
        };

        const ret = $.model.Topic.find(query, queryStr);
        // const ret2 = $.model.Topic.find(query, queryStr);

        if(params.skip) ret.skip(params.skip);
        if(params.limit) ret.limit(params.limit);

        return ret;

    });

    /**
     * Method
     * @method: topic.delete
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id删除帖子
     */
    $.method('topic.delete').check({
        _id: {required: true, validate: v => validator.isMongoId(v)}
    });
    $.method('topic.delete').register(async function (params) {

        return $.model.Topic.remove({_id: params._id});

    });

    /**
     * Method
     * @method: topic.update
     * @param {Object} 参数说明：_id:MongoId(帖子id)
     * @return {Object} 返回添加成功后的值
     * @description 根据帖子id删除帖子
     */
    $.method('topic.update').check({
        _id: {required: true, validate: v => validator.isMongoId(v)},
        tags: {validate: v => Array.isArray(v)}
    });
    $.method('topic.update').register(async function (params) {

        const update = {updateedAt: new Date()};
        if(params.title) update.title = params.title;
        if(params.content) update.content = params.content;
        if(params.tags) update.tags = params.tags;

        return $.model.Topic.update({_id: params._id}, {$set: update});

    });

    /**
     * Method
     * @method: topic.comment.add
     * @param {Object} 参数说明：_id:MongoId(帖子id) authorId（用户id） content（评论内容）
     * @return {Object} 返回添加成功后的值
     * @description 评论添加
     */
    $.method('topic.comment.add').check({
        _id: {required: true, validate: v => validator.isMongoId(v)},
        authorId: {required: true, validate: v => validator.isMongoId(v)},
        content: {required: true}
    });
    $.method('topic.comment.add').register(async function (params) {

        const date = new Date();
        const comment = {
            cid: new $.utils.ObjectId(),
            authorId: params.authorId,
            content: params.content,
            createdAt: date
        };
        const result = $.model.Topic.update({_id: params._id}, {$push: {comments: comment}});
        return result;

    });

    /**
     * Method
     * @method: topic.comment.delete
     * @param {Object} 参数说明：_id:MongoId(帖子id) cid（评论id）
     * @return {Object} 返回删除成功后的值
     * @description 评论删除
     */
    $.method('topic.comment.delete').check({
        _id: {required: true, validate: v => validator.isMongoId(v)},
        cid: {required: true, validate: v => validator.isMongoId(v)}
    });
    $.method('topic.comment.delete').register(async function (params) {

        return $.model.Topic.update({_id: params._id}, {$pull: {comments: {cid: params.cid}}});

    });

    done();
};