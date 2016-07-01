//var mycontro = require('../controller/mycontro');

exports.appRouter = function(app, requrl){
	var seperateuri = typeof requrl === 'string' ? requrl.split('/') : [];
	var controller = 'index';
	var func = 'index';
	if(typeof seperateuri[1] !== 'undefined' && !!seperateuri[1])
		controller = seperateuri[1];
	if(typeof seperateuri[2] !== 'undefined' && !!seperateuri[2])
		func = seperateuri[2];

	var fullpath = 'D:/Workspace/Bootstrap/koa/controller/' + controller + '.js';
	console.log(1);
	if(require('fs').existsSync(fullpath)){
	console.log(2);
		var myContro = require('../controller/' + controller);
	console.log(3);
		var realfunc = eval('myContro.' + func);
	console.log(4);
		if(typeof realfunc === 'function'){
	console.log(5);
			app.get('/' + controller + '/' + func, realfunc);
		}
	}
	console.log(6);

};

