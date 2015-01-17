var lambdaws 	= require('lambdaws'),
	Q 			= require('q');

module.exports = {
	createApi: function(function, email){
		// TODO : process func
		// TODO : upload func
		var results = {
			endPoints : {
				invokeUrl: 'the-invoke-url',
				revokeUrl: 'the-revoke-url'					
			},
			expires : 'in 12 hours',
			maxNumberOfCalls : 50
		}

		return results;
		// TODO : return promise
	}

}
