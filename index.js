var cluster = require('cluster')
  , os = require('os')
  , msg = require('./server.js')
  , log4js = require("log4js")
  , redis = require('./modules/cached/redisConn.js')
  , socket = require('./modules/socket/socket.js');



if(cluster.isMaster){
	os.cpus().forEach(function(){
		cluster.fork();
	});
	
	cluster.on('death', function(worker){
		process.nextTick(function(){
			cluster.fork();
		});
	});
}else{
	log4js.configure("log4js.json",{}); 
	var app = msg.app(log4js);
	var server = msg.boot(app);
	var data = redis.db();
	socket.io(server, data, log4js);
}