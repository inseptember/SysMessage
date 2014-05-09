var redisConf = {
	host : "127.0.0.1",
	port : 6379
};
var nodePort = 9001;
var memConf = {
	url : "192.168.1.165:11211"
};

exports.redis = redisConf;
exports.port = nodePort;

exports.debugMode = true;
exports.mem = memConf;
