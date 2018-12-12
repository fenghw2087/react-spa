const path = require('path');

const pathConfig = {
    'admin':{
        template:{
            page:path.join(__dirname, '../template/admin/page.js.template'),
            html:path.join(__dirname, '../template/admin/html.template'),
            less:path.join(__dirname, '../template/admin/less.template'),
            entry:path.join(__dirname, '../template/admin/entry.template'),
        },
        output: {
            page:path.join(__dirname, '../../src/admin/page'),
            html:path.join(__dirname, '../../src/admin/html'),
            entry:path.join(__dirname, '../../src/admin/entry'),
        }
    }
};

module.exports = pathConfig;