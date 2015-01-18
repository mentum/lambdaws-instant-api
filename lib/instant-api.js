var	lambdaws 	= require('lambdaws'),
	uploader	= require('./uploader');

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
