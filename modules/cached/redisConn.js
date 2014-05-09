var redis = require('redis')
	,conf = require('../../conf.js');


var createRedisDB = function(){
	const db = redis.createClient(conf.redis.port, conf.redis.host);
	return {
		initDb : function(){
			db.del("user-id-list");
			db.del("users-socketid-map");
		},
		addOnlineUser : function(name, soid){
			db.hexists("user-id-list", name, function(err, d){
				if(d===0){
					console.log("new online: " + soid + ", user: " + name);
					db.hset("users-socketid-map", name, soid);
					db.hset("user-id-list", name, name);
				}
			});
		},
		dropOnlineUser : function(name){
			db.hdel("users-socketid-map", name, function(err){
				console.log("offline user: " + name);
			});
			db.hdel("user-id-list", 0, name,function(err){
				console.log("");
			});
		},
		getAllOnlineUser : function(fn){
			db.hvals('user-id-list', fn);
		},
		getTargetUser : function(key, fn){
			db.hget("users-socketid-map",key, fn);
		},
		quit : function(){
			db.quit();
		},
		createConnection : function(){
			return redis.createClient(conf.redis.port, conf.redis.host);
		}
	};
};

exports.db = createRedisDB;