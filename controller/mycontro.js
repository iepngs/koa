var Model = require('../model/mymodel');
module.exports = {
    index: function*(){
    	var result = yield Model.insert();
    	console.log(result);
    	var items = yield Model.findAll();
    	console.log(items);
        yield this.render('mycontro/index',{"title":"mycontro index function"});
    }
}