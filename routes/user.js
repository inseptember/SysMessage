var db = require('../redisConn.js').db();

exports.list = function(req, res){
	var users = [1,2,3];
	db.getAllOnlineUser(function(err, d){
		users[users.length] = d;
	});
  res.render("users", {list : users});
};