'use strict';

import validator from 'validator';

module.exports = function (done) {

    /**
     * Method
     * name: User.add
     * desc: 用户添加方法
     */
    $.method('user.add').check({
        name: {required: true, validate: (v) => validator.isLength(v, {min: 6, max: 36}) && /^[a-zA-Z]/.test(v)},
        email: {required: true, validate: (v) => validator.isEmail(v)},
        password: {required: true, validate: (v) => validator.isLength(v, {min: 6, max: 36})}
    });
    $.method('user.add').register(async function (params) {


        params.name = params.name.toLowerCase();


        {
            const user = await $.method('user.get').call({name: params.name});
            if(user) {
                throw {
                    code: -1,
                    errMsg: `用户${params.name}已经存在`
                };
            }
        }

        {
            const user = await $.method('user.get').call({email: params.email});
            if(user) {
                throw {
                    code: -2,
                    errMsg: `邮箱${params.email}已经存在`
                };
            }
        }

        params.password = $.utils.encryptPassword(params.password.toString());
        return new $.model.User(params).save();

    });

    /**
     * Method
     * name: User.get
     * desc: 获取用户方法
     */
    $.method('user.get').check({
        _id: {validate: (v) => validator.isMongoId(v)},
        name: {validate: (v) => validator.isLength(v, {min: 6, max: 36}) && /^[a-zA-Z]/.test(v)},
        email: {validate: (v) => validator.isEmail(v)},
    });
    $.method('user.get').register(async function (params) {

        const query = {};
        if(params._id) {
            query._id = params._id;
        }else if(params.name) {
            query.name = params.name;
        } else if(params.email) {
            query.email = params.email;
        } else {
            throw {
                code: -1,
                errMsg: 'Please entry your query content [_id|name|email]'
            };
        }
        return $.model.User.findOne(query);

    });

    /**
     * Method
     * name: User.update
     * desc: 用户信息修改方法
     */
    $.method('user.update').check({
        _id: {validate: (v) => validator.isMongoId(v)},
        name: {validate: (v) => validator.isLength(v, {min: 6, max: 36}) && /^[a-zA-Z]/.test(v)},
        email: {validate: (v) => validator.isEmail(v)},
    });
    $.method('user.update').register(async function (params) {

        const user = await $.method('user.get').call(params);
        if(!user) {
            throw {
                code: -1,
                errMsg: `user ${params.name} not exists`
            };

        }

        const update = {};
        if(user.name && user.name !== params.rename) update.name = params.rename;
        if(user.email && user.email !== params.email) update.email = params.email;
        if(user.password && !$.utils.validatePassword(params.password, user.password)) update.password = $.utils.encryptPassword(params.password);
        if(user.nickname && user.nickname !== params.nickname) update.nickname = params.nickname;
        if(user.about && user.about !== params.about) update.about = params.about;

        return $.model.User.update({_id: user._id}, {$set: update});

    });

    done();

};