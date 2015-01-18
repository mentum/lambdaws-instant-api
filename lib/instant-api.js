var	lambdaws 	= require('lambdaws'),
	request		= require('request'),
	Q 			= require('q');

// todo : change this according to the PAAS URL
// var UPLOAD_URL = 'https://instant-api.herokuapp.com/cloudify'
var UPLOAD_URL = 'http://localhost:3000/create'

function _upload (zipContent, config, functionIdentifier, isModule) {
	var deferred = Q.defer();
	
	var formData = {
		functionData : {
			value: zipContent,
			options: {
				config : config,
				functionIdentifier : functionIdentifier,
				isModule : isModule		
			}
		}
	}

	function requestCallback(err, res, data){
		console.log(err, res, data);
		if(err){
			deferred.reject(err);
		} else{
			deferred.resolve(data);
		}
	}

	console.log(zipContent);
	var postReq = request.post(UPLOAD_URL, requestCallback);
	var form = postReq.form();
	
	form.append('functionData', zipContent);
	form.append('config', JSON.stringify(config));
	form.append('functionIdentifier', JSON.stringify(functionIdentifier));
	form.append('isModule', JSON.stringify(isModule));

	// todo : change timeout for a setting
	return deferred.promise.timeout(5000, "Upload function timed out");
}

function _extendLambdaws(args, extendedLambdaws){
	extendedLambdaws.container.lambdaHelper.uploader = _upload;
	
	// console.log(args);
	var result = extendedLambdaws.create.apply(this, args);
	// console.log(result);
	// todo return what returned invoke and revoke urls given by the api
}

module.exports = {
	config: lambdaws.config,

	createApi: function(){
		lambdaws.extend(_extendLambdaws.bind(this, arguments));
	}
}
