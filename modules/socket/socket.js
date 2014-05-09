var conf = require('../../conf.js')
	,socketio = require('socket.io');


var createSocketIO = function(server, dataBase, log4js){
	io = socketio.listen(server,{origins: '*:*'});
	var logger = log4js.getLogger('io');
	io.set('logger', logger);
	io.set('log level', log4js.levels.INFO);
	io.set('transports', ['websocket','flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
	io.sockets.on('connection', function (socket) {
		const subscribe = dataBase.createConnection();
		
		socket.on('message', function(data){
			logger.info("revieve message('" + data.msg + "') from " + socket.id + ", user " + data.from);
			dataBase.addOnlineUser(data.from, socket.id);
			dataBase.getTargetUser(data.to, function(err, d){
				var client = io.sockets.sockets[d];
				if(client&&client.name==data.to){
					client.emit("message", data);
					logger.info("send message('" + data.msg + "') to " + d + ", user " + data.to);
				};
			});
	    });
		socket.on('disconnect', function(){
			if(socket.channel){
				subscribe.unsubscribe(socket.channel);
				subscribe.quit();
			}
			dataBase.dropOnlineUser(socket.name);
			dataBase.getAllOnlineUser(function(err, d){
				socket.broadcast.emit("offline",{user:socket.user, count : d.length});
			});
		});
		socket.on('sys', function(data) {
			socket.name = data.user;
			if(data.channel){
				subscribe.psubscribe(data.channel);
				socket.channel = data.channel;
				logger.info("subscribe channel " + data.channel + ";");
			}
		});
		socket.on('online', function(data){
			socket.name = data.user;
			dataBase.addOnlineUser(socket.name, socket.id);
			dataBase.getAllOnlineUser(function(err, d){
				socket.emit("online", {users:d, count : d.length});
				socket.broadcast.emit("newonline",{user:data.user, count : d.length});
			});
		});
		socket.on('reconnecting', function(data){
			logger.info('reconnecting + ' + data);
		});
		socket.on('reconnect', function(data){
			logger.info('reconnecting + ' + data);
			subscribe = dataBase.createConnection();
		});
		subscribe.on('pmessage', function(pattern, channel, message){
			socket.emit('sys', {channel: channel, data: message});
			logger.info("publish message('" + message + "') to channel " + channel + ";");
		});
		socket.on('error', function (err) {
			logger.info(err.stack);
		});
	});
};

exports.io = createSocketIO;