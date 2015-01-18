var	lambdaws 	= require('lambdaws'),
	uploader	= require('./uploader');

// todo : change this according to the PAAS URL
// var UPLOAD_URL = 'https://instant-api.herokuapp.com/cloudify'
var UPLOAD_URL = 'http://localhost:3000/create'

function _extendLambdaws(extendedLambdaws){
	extendedLambdaws.container.lambdaHelper.uploader = uploader;
	extendedLambdaws.container.lambdaHelper.createProxy = function(_,__, promise) { return promise };
}

module.exports = {
	config: function (configs){
		if(typeof configs.email !== 'string'){
			throw Error('you need to specify your email');
		}
		lambdaws.config(configs);
	},

	createApi: function(){
		lambdaws.extend(_extendLambdaws);
		return lambdaws.create.apply(this, arguments);
	}
}
