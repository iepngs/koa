'use strict';

/**
 * Dependencies
 */

const co = require('co');


/**
 * Expose fn and Run a generator function and print errors if any
 */

exports.run = function (fn) {
	co(fn).catch(function (err) {
		console.error(err.stack);
	});
}
