# Lambdaws Instant API

Create scalable and distributed public API endpoints from any Javascript function. Backed by AWS Lambda and Lambdaws.

## Usage
### Installation

```npm install lambdaws-instant-api``` or clone this repo.

### Create an Instant Function
```js
var lamdawsInstantApi = require('lambdaws-instant-api');

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

### Complete API documentation
You can view the full API documentation [here](http://lambdaws-instant-api.herokuapp.com/).

## Limitations

You will understand that since this is an alpha product and it is free to use, your usage of the library is therefore limited. These restrictions are currently in place:
- Instant Functions expire after 50 calls or 30 minutes (the first to be triggered)
- Possible rate limits if doing too many requests in a given amount of time. In which case we will politely ask you to slow down and kick you for a few minutes.
- There is a 2000ms delay before the function is launched

These limitations will all go away once we go in private beta.

### Alpha
lambdaws-instant-api is at a very very early stage. This is by no mean a stable product and should not be used in a production environment.

### Private Beta
Please subscribe to the private beta by calling the feedback route. We will send out limited amount of invites once we go in beta.

### Feedback
Please give the library a try and give us your feedback. You can do so by invoking the ```/feedback``` route. More information is available [here](http://lambdaws-instant-api.herokuapp.com/).
