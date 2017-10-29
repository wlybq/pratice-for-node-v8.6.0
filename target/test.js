'use strict';

// $.method('user.add').call({
//     name: 'csw123456',
//     email: 'csw@qq.com',
//     password: '123456',
//     nickname: '测试用户2',
//     about: 'this is Second user'
// }, console.log);

// $.method('user.get').call({
//     name: 'csl123456'
// }, console.log);

$.method('user.update').call({
    name: 'csl123456',
    rename: 'csl123456',
    email: 'csl@qq.com',
    password: '54321612',
    nickname: '测试用户3',
    about: 'update Second user'
}, console.log);