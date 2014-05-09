var db = require('../modules/cached/redisConn.js').db();
var mem = require('../modules/cached/memcached.js').conn();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.user = function(req, res){
	var users = [];
	db.getAllOnlineUser(function(err, d){
		users[users.length] = d;
	});
  res.render("user/users", {list : users});
};

exports.lock = function(req, res){
	var orderNo = req.query.orderNo;
	var kickName = req.query.kickName;
	var ret = {orderNo:'',user:''};
	
	if(orderNo){
		ret.orderNo = orderNo;
		if(kickName){
			mem.del('order_order_edit_action_orderNo_' + req.query.orderNo, function(u){
				res.render("lock/lock", ret);
			});
		}else{
			mem.get('order_order_edit_action_orderNo_' + req.query.orderNo, function(u){
				ret.user = u;
				res.render("lock/lock", ret);
			});
		}
	}else{
		res.render("lock/lock", ret);
	}
};

exports.menu = function(req, res){
}