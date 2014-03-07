redis
====
#### redis 后台启动
maemonize yes
#### 启动
./redis-server /usr/local/redis/etc/redis.conf
#### 查看
ps -ef | grep redis
#### 查看端口
netstat -tunpl | grep 6379
#### redis 进入客户端
./redis-cli
#### 结束redis服务
pkill redis-server
./redis-cli shutdown

node
====
#### 后台运行node
安装：npm install forever -g

使用forever启动守护进程：
forever start server.js

关闭守护进程：
forever stop server.js

如果需要记录输出日志和错误：
forever start -l forever.log -o out.log -e err.log server.js