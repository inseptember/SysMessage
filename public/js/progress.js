var Context = {};

Context.labels = {
	x:100,
	xlength : 5,
	y:100,
	ylength : 2,
	xOrigin : 15,
	yOrigin : 15
};

var Point = function(x, y){
	this.x = x;
	this.y = y;
	this.ix = Context.labels.xlength * this.x * -1;
	this.iy = Context.labels.ylength * this.y;
};

Point.prototype.clone = function(p){
	this.x = p.x;
	this.y = p.y;
	this.ix = p.ix;
	this.iy = p.iy;
};

var Progress = function(cxt){
	this.cxt = cxt;
	this.lheight = this.cxt.canvas.height;
	this.lwidth = this.cxt.canvas.width;
	this.initContext();
	this.stack = [];
};

Progress.prototype.initContext = function(){
	this.cxt.translate(Context.labels.xOrigin, this.lheight - Context.labels.yOrigin);
	this.cxt.rotate(-Math.PI);
	this.cxt.save();
};

Progress.prototype.drawLine = function(){
	this.cxt.beginPath();
	this.cxt.moveTo(this.a.ix, this.a.iy);
	this.cxt.lineTo(this.b.ix, this.b.iy);
	this.cxt.stroke();
	
};

Progress.prototype.pointTo = function(p){
	if(this.a){
		this.a.clone(this.b);
	}else{
		this.a = new Point(p.x, p.y);
	}
	this.b = new Point(p.x, p.y);
};

Progress.prototype.join = function(x, y){
	this.pointTo(new Point(x, y));
	this.stack.push(this.b);
};

Progress.prototype.moveLeft = function(){
	var f = this.stack.shift();
	this.cxt.translate(1 * Context.labels.xlength, 0);
	this.a = undefined;
};

Progress.prototype.clear = function(){
	this.cxt.clearRect(0, this.lheight,-this.lwidth, -this.lheight);
};

Progress.prototype.addOne = function(x, v){
	this.join(x, v);
	if(this.stack.length > Context.labels.x){
		this.moveLeft();
		this.clear();
		this.refresh();
	}else{
		this.drawLine();
	}
};

Progress.prototype.refresh = function(){
	var progress = this;
	this.stack.forEach(function(p){
		progress.pointTo(p);
		progress.drawLine();
	});
};