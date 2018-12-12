const entrysObj = require('../../config/entry.admin.config');

const entrys = Object.keys(entrysObj);
const createPage = require('../util/createPage');

entrys.forEach((v)=>{
    const _params = 'admin/'+v;
    console.log(`----start create ${_params} page----`);
    createPage(_params);
});
