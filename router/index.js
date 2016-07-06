//var mycontro = require('../controller/mycontro');

var co = require('co')

exports.appRouter = function(app, requrl){
	var seperateuri = typeof requrl === 'string' ? requrl.split('/') : [];
	var controller = 'index';
	var func = 'index';
	if(typeof seperateuri[1] !== 'undefined' && !!seperateuri[1])
		controller = seperateuri[1];
	if(typeof seperateuri[2] !== 'undefined' && !!seperateuri[2])
		func = seperateuri[2];
	var path = require('path');
	var fullpath = path.join(path.resolve(__dirname, '../controller/'), controller + '.js');
	
	if(require('fs').existsSync(fullpath)){
		var myContro = require('../controller/' + controller);
		var realfunc = eval('myContro.' + func);
		if(typeof realfunc === 'function'){
			app.get('/' + controller + '/' + func, realfunc);
			return co(realfunc.bind(this))
		}
	}
	console.log(6);

};
