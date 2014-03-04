var settings = require('../settings');
var mysql = require('mysql');
var queues = require('mysql-queues');

module.exports = mysql.createConnection({
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port
});