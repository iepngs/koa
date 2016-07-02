'use strict';

var app = require('koa')();
var logger = require('koa-logger')();
var parse = require('co-body');
var error = require('koa-error');
var config = require('./config/config');

app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});
// print req&res logger on terminal console
app.use(logger);

// onerror show page
app.use(error({
	engine: 'lodash',
	template: './error.html'
}));

/*var minilogger = require('mini-logger');
app.context.logger = minilogger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});*/


//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});

/*app.use(require('koa-static')(__dirname + '/public'));

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(path.join(staticDir, 'js')));
app.use(staticCache(path.join(staticDir, 'css')));*/

//路由
var router = require('koa-router');
app.use(router(app));
app.use(function* (next){
	if(typeof this.path === 'undefined')
		yield next;
	var appRouter = require('./router/index');
	appRouter.appRouter.call(this, app, this.path);
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

module.exports = app;
