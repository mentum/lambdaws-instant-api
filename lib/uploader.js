var	request		= require('request'),
	Q 			= require('q');

var UPLOAD_URL = 'http://localhost:3000/create';

module.exports = function (zipContent, config) {
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
