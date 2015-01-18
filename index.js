// module.exports = require('./lib/instant-api');
var test = require('./lib/instant-api');


var minus = function(a, b, callback) {
	require('q');
	callback(a - b);
};

test.config();

var cloudedMinus = test.createApi(minus, ['fs', 'q'], {
	name: 'MINUS'
});

