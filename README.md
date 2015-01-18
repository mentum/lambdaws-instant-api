# Lambdaws instant api

Create scalable and distributed api endpoints with any javascript function

## Create your api endpoint:
```
var lamdawsInstantApi = require('lamndaws-instant-api');

var minus = function(a, b, callback){
  callback(a + b);
}

lamdawsInstantApi.config({email: 'your@email.com'});

lamdawsInstantApiest.createApi(minus, ['q'], {name: 'MINUS'})
	.then(function(instantEndpoints){
		  console.log(instantEndpoints);
		  // this outputs
		  //{invokeUrl: "Url used to ivoke your clouded function", revokeUrl : "Url used to revoke your clouded function}
	});
```

## Invoke your function
Get or post with the invokeUrl provided by createApi

``` 
curl "http://lambdaws-instant-api.herokuapp.com/invoke/your-invoke-id?a=3&b=2"
```

returns
```
{
  success: true,
  result: 1
}
```
## Revoke your function
Disables your function and won't delete your function from AWS Lambda
``` 
curl "http://lambdaws-instant-api.herokuapp.com/revoke/your-revoke-id?a=3&b=2" -d {}
```

returns 
```
200 OK
```



