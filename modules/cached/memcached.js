var memcached = require('memcached')
	,conf = require('../../conf.js');

var conn = function(){
	return {
		get : function(k, c){
			var cached = new memcached(conf.mem.url);
			cached.get(k, function(e, r){
				c(r);
				cached.end();
			});
		},
		set : function(k, v, expire, c){
			var cached = new memcached(conf.mem.url);
			cached.set(k, v, expire, function(e, r){
				if(c){
					c(r);
				}
				cached.end();
			});
		},
		del : function(k, c){
			var cached = new memcached(conf.mem.url);
			cached.del(k, function(e, r){
				if(c){
					c(r);
				}
				cached.end();
			});
		}
	};
};

exports.conn = conn;