var	request			= require('request'),
	Q 				= require('q'),
	fs 				= require('fs'),
	uuid			= require('node-uuid');

var UPLOAD_URL = 'http://localhost:3000/create'

module.exports = function (zipContent, config) {
	var deferred = Q.defer();

	function requestCallback(err, res, data){
		console.log(err,res,data);
		if(err){
			deferred.reject(err);
		} else{
			deferred.resolve(data);
		}
	}

	var fileName = uuid.v4() + '.zip';
	fs.writeFileSync('./' + fileName, zipContent);

	var formData = {
		zippedFunction: [
			fs.createReadStream('./' + fileName)
		],
		config: JSON.stringify(config),
		email: JSON.stringify(global.settings.email)
	};
	
	var postReq = request.post({url: UPLOAD_URL, formData: formData}, function() {
		fs.unlink('./' + fileName);
		requestCallback.apply(this, arguments);
	});

	// todo : change timeout for a setting
	return deferred.promise.timeout(5000, "Upload function timed out");
}
