module.exports = {
    index: function*(next){
    	console.log(45);
    	var time = +new Date();
    	console.log(time);
        yield this.render('index/index',{"title":'koa page', 'time':time});
    },
    showbug: function*(next){
    	console.log(46);
    	var time = +new Date();
    	console.log(time);
        yield this.render('index/index',{"title":"koa demo", 'time':time});
    }
}


