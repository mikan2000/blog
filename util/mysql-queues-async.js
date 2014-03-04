var mysql = require('mysql');
var async = require('async');
// 加载mysql-queues 支持事务
var queues = require('mysql-queues');

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'huifub',
    port: 3306
});

// 获取事务
queues(client);

var sqls = {
    'insertSQL': 'insert into htest (id,title) values(16,"test1")',
    'insertSQL2': 'insert into htest (id,title) values(16,"test2")'
};
var conn = client.startTransaction();
var tasks = ['insertSQL', 'insertSQL2'];
async.eachSeries(tasks, function (item, callback) {
    console.log(item + " ==> " + sqls[item]);
    conn.query(sqls[item], function (err, res) {
        console.log(res);
        callback(err, res);
    });
}, function (err) {
    console.log("err: " + err);
    if (err) {
        console.log("err: " + err);
        console.log("rollback");
        // 出错的场合 回滚
        conn.rollback();
    } else {
        console.log("commit");
        // 没有错误的场合 提交事务
        conn.commit();
    }
});
conn.execute();