
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// 暂时用不到
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var webot = require('weixin-robot');
var googleapis = require('./lib/googleapis.js');

var app = express();
// 指定回复消息
webot.set('hi', '嘿嘿嘿嘿');
webot.set('晚安', '晚安啦~');
webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅啦啦啦啦啦';
  }
});
webot.set('test', {
  pattern: 'test',
  handler: function(info) {
    return info.text;
  }
});
webot.set('shorturl', {
  pattern: '^((http|https)://)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9]).)+[a-zA-Z]{2,6}$',
  handler: function(info) {
    console.log("1111111111111");
    googleapis
    .discover('urlshortener', 'v1')
    .execute(function(err, client) {
      var printResult = function(err, result) {
        if (err) {
          console.log("2222222222222");
          return err;
        } else {
          console.log("333333333333333333");
          console.log('Result: ', result.id);
          return result.id;
        }
      };
      client.urlshortener.url
          .insert({ longUrl: info.text })
          .execute(printResult);
    });
  }
});

// 接管消息请求
webot.watch(app, { token: 'poppy', path: '/wechat' });

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
