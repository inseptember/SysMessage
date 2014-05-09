var routes = require('../../routes');

var GET = {
	paths : {
		'/' : routes.index,
		'/users' : routes.user,
		'/users/lock' : routes.lock,
		'/menu' : routes.menu
	}
};

var POST = {
	
};

exports.get=GET;
exports.post=POST;