const path = require('path');

const entryName = [
    'login',//登录
    'flowDetail',//流程审核
    'hotelFill',//酒店填报
    'layout',//物理房型
    'price',//售卖房型
    'picture',//图片上传
    'message',//消息页
    'flow',//流程
    'hotelDetail',//酒店详情
    'registerResult',//注册查询
    'register',//酒店注册
    'placeManage',//地标管理
];

module.exports = entryName.reduce((o,v)=>{
    o[v] = path.resolve(__dirname, `../src/admin/entry/${v}.js`);
    return o;
},{});
