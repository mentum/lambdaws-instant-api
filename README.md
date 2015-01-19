# Lambdaws Instant API

Create scalable and distributed public API endpoints from any Javascript function. Backed by AWS Lambda and Lambdaws.

## Usage
### Installation

```npm install lambdaws-instant-api``` or clone this repo.

### Create an Instant Function
```js
var lamdawsInstantApi = require('lamdaws-instant-api');

var minus = function(a, b, callback) {
callback(a - b);
}

lamdawsInstantApi.config({ email: 'your@email.com' }); // So we can reach you when we are in beta

// Use Lambdaws syntax (https://github.com/mentum/lambdaws)
lamdawsInstantApi.createApi(minus, ['q'])
	.then(function(instantEndpoints){
		  console.log(instantEndpoints);
		  // this outputs
		  //{ invokeUrl: "Url used to ivoke your clouded function", 
		  //  revokeUrl : "Url used to revoke your clouded function }
	});
```

### Invoking it

Get or post with the ```invokeUrl``` provided by createApi. 
If using ```GET```, append to the URL the parameters.
If using ```POST```, put the parameters in the body.
The parameter names don't matter, only the order is important.

```
curl "http://lambdaws-instant-api.herokuapp.com/invoke/your-invoke-id?a=3&b=2"
```

returns
```js
{
  success: true,
  result: 1 // 3 - 2
}
```
### Revoking it

Disables your function. Won't delete your function from AWS Lambda

``` 
curl "http://lambdaws-instant-api.herokuapp.com/revoke/your-revoke-id?a=3&b=2" -d {}
```

returns 
```
200 OK
```





