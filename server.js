var http = require('http')
	, express = require('express')
	, routes = require('./modules/routes/config.js')
	, path = require('path')
	, conf = require('./conf.js')
	, ejs = require('ejs');

var createMsgApp = function(log4js){
	var app = express();
	var logger = log4js.getLogger('app');
	// all environments
	app.set('port', process.env.PORT || conf.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
//	app.set('view engine', 'ejs');
	app.engine('.html', ejs.__express);
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(log4js.connectLogger(logger, {level:'auto'}));
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	if(routes.get.paths){
		for(var key in routes.get.paths){
			app.get(key, routes.get.paths[key]);
		}
	}
	return app;
};

var createServer = function(app){
	var server = http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
	return server;
};



exports.boot = createServer;
exports.app = createMsgApp;