/**
 * 
 */

var MsgSocket = function(config){
	this.options = config;
	this.connectStatus = io&&io.connect?0:-1;
	var param  = {};
	if(config.channel&&config.channel=="sys"){
		this.options.channel = "channel:" + config.channel + "-" + config.user;
	}
	this.options.user = config.user;
	this.options.reconnectIntervalFlag;
	this.options.reconnectTimes = 5;
	this.options.reconnectInterval = 10 * 1000;
	return this;
};

MsgSocket.prototype.connect = function(){
	var _this = this;
	if(_this.connectStatus<0){
		return
	}
	var config = _this.options;
	_this.socket = _this.createConnection(config);
	_this.bindListener({
		'connect' : function(){
			_this.onLine();
			console.log('connected');
		},
		'connecting' : function(){
			console.log('connecting');
		},
		'disconnect' : function(){
			console.log("connect failed, prepare to reconnect.");
			_this.connectStatus = -1;
			_this.reConnecting();
		},
		'connect_failed' : function(){
			console.log('connect_failed');
		},
		'error' : function(err){
			console.log('err' + error);
		},
		'reconnect_failed' : function(){
			console.log('reconnect_failed');
		},
		'reconnect' : function(){
			_this.connectStatus = 0;
			_this.reConnected();
			console.log("reconnect success!");
		},
		'reconnecting' : function(){
			console.log('reconnecting');
		}
	});
	this.bindListener(config.listener);
	return this;
};

MsgSocket.prototype.createConnection = function(){
	var config = this.options;
	return io.connect("http://" +config.host,{
		port:config.port, 
		reconnect: false, 
		'try multiple transports': false
	});
};

MsgSocket.prototype.onLine = function(){
	this.send('online', {user : this.options.user});
};

MsgSocket.prototype.reConnecting = function(){
	var _this = this;
	var times = 0;
	_this.options.reconnectIntervalFlag = setInterval(function(){
		try{
			times ++;
			_this.socket.socket.reconnect();
		}catch(e){
			
		}
		if(_this.options.reconnectTimes==times){
			clearInterval(_this.options.reconnectIntervalFlag);
		}
	} , _this.options.reconnectInterval);
};

MsgSocket.prototype.reConnected = function(){
	var _this = this;
	clearInterval(_this.options.reconnectIntervalFlag);
	if(_this.options.channel){
		_this.addSysChannel();
	}
	_this.onLine();
};

MsgSocket.prototype.addSysChannel = function(){
	var config = this.options;
	if(config.channel&&config.channel=="sys"){
		config.channel = "channel:" + config.channel + "-" + config.user;
	}
	this.send('sys', {user:config.user, channel:config.channel});
	this.connectStatus = 1;
};

MsgSocket.prototype.bindListener = function (a){
	var s = this.socket;
	for(var k in a){
		if(typeof k == "string" && typeof a[k] == "function"){
			s.on(k, a[k]);
		}
	}
};

MsgSocket.prototype.send = function(cmd, param){
	this.socket.emit(cmd, param);
};