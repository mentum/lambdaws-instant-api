// module.exports = require('./lib/instant-api');
var test = require('./lib/instant-api');


var minus = function(a, b, callback) {
	require('q');
	callback(a - b);
};

test.config({email: 'lol@lo.com'});

test.createApi(minus, ['fs', 'q'], {name: 'MINUS'})
	.then(function(data){
		console.log("Data From Server", data);
	});

