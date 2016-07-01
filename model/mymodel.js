'use strict';
var Mongorito = require('mongorito');
var Model = Mongorito.Model;
//var Client = this.config.mongoAuth.client;
var Client = 'localhost';

Mongorito.connect(Client + '/blog');

class Post extends Model {
	collection() {
        return 'posts';
    }
}

// insert
exports.insert = function* () {
	var post = new Post({
	    title: 'Node.js with --harmony rocks!',
	    body: 'Long post body',
	    author: {
	        name: 'John Doe'
	    }
	});
	return yield post.save();
}; 

// remove
exports.insert = function* () {
	yield Post.remove();
	// You can also remove all models matching a certain criteria:
	// Post.remove({ title: 'New title' });
}

// update
exports.update = function* () {
	post.set('title', 'Post got a new title!');
	post.set('author.name', 'Doe John');
	
	yield post.save();
}; 

// select all
exports.findAll = function* () {
	var posts = yield Post.all();
	// or like this :
	// var posts = yield Post.find();
}

// Find where field exists (Find documents where field title exists:)
exports.exists = function* () {
	var posts = yield Post.where('title').exists().find();
}

// Find by ID
exports.findById = function* () {
	var posts = yield Post.findById('56c9e0922cc9215110ab26dc');
	return posts;
}



exports.countPage = function*(pageNum, pageSize, query){
    pageNum = pageNum*1 || 1;
    pageSize = pageSize || 10;
    query = query || {};
    var result = {};

    // 数据量
    result.totalNum = yield this.model('Post').count(query);
    // 当前多少页
    result.pageNum = pageNum;
    // 一共多少页
    result.totalPage = Math.ceil( result.totalNum / pageSize );
    // 是否有上一页
    result.hasPrePage = (pageNum - 1 > 0);
    // 是否有下一页
    result.hasNexPage = (pageNum + 1 <= result.totalPage);

    return result;
}


// find where
exports.findByCdt = function* () {
	var posts = yield Post.find({ title: 'Great title' });
	var posts = yield Post.find({ title: /^node/i });
	
	// Fetch documents, where sub-documents match a criteria:
	// matching posts where at least one comment.body is "Nice comment"
	var posts = yield Post.where('comments', { body: 'Nice comment' }).find();
	
	//Find where field passes logical operator
	/**
	 * There are 4 types of logical operators available:
	 * Greater than (>, $gt)
	 * Greater or equal than (>=, $gte)
	 * Less than (<, $lt)
	 * Less or equal than (<=, $lte)
	 * Example:
	 */
	var posts = yield Post.where('position').gt(5).find();
	var posts = yield Post.gt('position', 5).find();
	
	// Find using “in” or “not in”
	var posts = yield Post.where('title').in(['First title', 'Second title']).find();
	
	// Find using or
	var posts = yield Post.or({title: 'First title'}, {title: 'Second title'}).find();
	
	// Skip first N results:
	var posts = yield Post.skip(4).find();
	
	// Pagination
	var posts = yield Post.limit(5).skip(10).find();
	
	// Sort results
	// descending
	Post.sort('comments_number', -1);
	// ascending
	Post.sort('comments_number', 1);
	//Let’s take a look at this example to get a better understanding. Imagine you have such Post document in a database:
	//	{
	//	    "_id": ObjectId("5234d25244e937489c000004"),
	//	    "title": "Great title",
	//	    "body": "Great body",
	//	    "comments": [
	//	        ObjectId("5234d25244e937489c000005"),
	//	        ObjectId("5234d25244e937489c000006"),
	//	        ObjectId("5234d25244e937489c000007")
	//	    ]
	//	}
	// Now, to fetch this post and its comments normally you would do this (or something like this):
	//	var post = yield Post.findOne();
	//	var comments = post.get('comments');
	//	
	//	var index = 0;
	//	var commentId;
	//	
	//	while (commentId = comments[index]) {
	//	    comments[index] = yield Comment.findById(commentId);
	//	
	//	    index++;
	//	}
	// First, you fetch a post document. Then, you iterate over comments array and for each comment id fetch a comment document. 
	// With populating, you don’t need to write all that and instead just do this:
	var post = yield Post.populate('comments', Comment).findOne();
	var comments = post.get('comments');
}

// Count results
exports.countAll = function* () {
	yield Post.count();
	yield Post.count({ awesome: true });
}

// disconnect
exports.close = function* () {
	yield Mongorito.disconnect();
}
