var	lambdaws 	= require('lambdaws'),
	request		= require('request'),
	Q 			= require('q');

// todo : change this according to the PAAS URL
var UPLOAD_URL = 'https://instant-api.herokuapp.com/cloudify'

function _upload (zipContent, config, functionIdentifier, isModule) {
	var deferred = Q.defer();
	
	var formData = {
		form : {
			zipContent : zipContent,
			config : config,
			functionIdentifier : functionIdentifier,
			isModule : isModule
		}
	}

	function requestCallback(err, res, data){
		if(err){
			deferred.reject(err);
		} else{
			deferred.resolve(data);
		}
	}

	request.post(UPLOAD_URL, formData, requestCallback);

	// todo : change timeout for a setting
	return deferred.promise.timeout(5000, "Upload function timed out");
}

function _extendLambdaws(args, extendedLambdaws){
	extendedLambdaws.container.lambdaHelper.uploader = _upload;
	
	var result = extendedLambdaws.create(arguments)
	// todo return what returned invoke and revoke urls given by the api
}

module.exports = {
	config: lambdaws.config,

	createApi: function(){
		lambdaws.extend(_extendLambdaws.bind(this, arguments));
	}
}
