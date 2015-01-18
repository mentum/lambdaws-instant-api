var	lambdaws 	= require('lambdaws'),
	request		= require('request'),
	Q 			= require('q');

// todo : change this according to the PAAS URL
// var UPLOAD_URL = 'https://instant-api.herokuapp.com/cloudify'
var UPLOAD_URL = 'http://localhost:3000/create'

function _upload (zipContent, config) {
	var deferred = Q.defer();

	function requestCallback(err, res, data){
		if(err){
			deferred.reject(err);
		} else{
			deferred.resolve(data);
		}
	}

	var postReq = request.post(UPLOAD_URL, requestCallback);
	var form = postReq.form();

	form.append('functionData', zipContent);
	form.append('config', JSON.stringify(config));
	form.append('email', JSON.stringify(global.settings.email));

	// todo : change timeout for a setting
	return deferred.promise.timeout(5000, "Upload function timed out");
}

function _extendLambdaws(extendedLambdaws){
	extendedLambdaws.container.lambdaHelper.uploader = _upload;
	extendedLambdaws.container.lambdaHelper.createProxy = function(_,__, promise) { return promise };
}

module.exports = {
	config: function (configs){
		if(typeof configs.email !== 'string'){
			throw Error('you need ');
		}
		lambdaws.config(configs);
	},

	createApi: function(){
		lambdaws.extend(_extendLambdaws);
		return lambdaws.create.apply(this, arguments);
	}
}
