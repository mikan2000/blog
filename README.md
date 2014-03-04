blog
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