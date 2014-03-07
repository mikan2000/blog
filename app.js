
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// 暂时用不到
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 删除原版 把路由控制器和实现路由功能的函数都放到 index.js 里
// app.js 中只有一个总的路由接口
// app.get('/', routes.index);
// app.get('/users', user.list);

// 新添加
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
