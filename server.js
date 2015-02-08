// URL shortener API
// install node and start with 'node server.js'
// Insert URL with 'curl -i -X POST -d 'link=http://google.de' http://localhost:5000/shorten/'
// You will get a 5 digit 'id' in return
// Go to 'localhost:5000/id' and you will be redirected =)

var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	qs = require('querystring'),
	fileServer = require('./file_server'),
	tools = require('./tools');

// "Database"
var store = {};

var server = http.createServer(function (request, response) {
	console.log("Request for " + request.url + " received.");

	if(request.method === 'POST' && request.url === "/shorten/"){

		var data;

		request.on('data', function (chunk) {

			data = qs.parse(chunk.toString('utf8'));

			if (typeof (data['link']) === 'undefined') {
				response.writeHead(409, {
					'Access-Control-Allow-Origin': '*' });
				response.end("Invalid agument: Link must be supplied e.g. 'link=http://google.fi'.");
			}
			else if (!tools.isValidURL(data['link'])) {
				response.writeHead(409, {
					'Access-Control-Allow-Origin': '*' });
				response.end("Invalid url: Check for errors in url and try again.");
			}
			
		});

		request.on('end', function () {
			if ((data['link'] !== undefined) && (tools.isValidURL(data['link']))) {
				var id = tools.createId(store);
		    store[id] = data['link'];
		    console.log(data['link']);
		    response.writeHead(201, {
		    	'Content-Type': 'text/plain',
		    	'Access-Control-Allow-Origin': '*' });
		    response.end(request.headers.host + '/' + id);
			}
		});
		}

	else if (request.method === 'GET') {

		var id = request.url.slice(1);

		// serve static files.
		if (request.url == "/" || request.url == "/index.html" || request.url == "/script.js" || request.url == "/style.css" || request.url == "/img/bg.jpg" || request.url == "/img/url.png") {
			
			var file = __dirname + request.url;
			if(request.url === '/') {
			   // serve index.html on root 
			   file = __dirname + '/index.html'
			}
			// serve files
			fileServer(file, request, response);
		}

		// redirect the user
		else if (store[id]) {
			var redirectURL = store[id];
			response.writeHead(301, {
				'Location': redirectURL });
			response.end();
		}
		// if requested link is wrong, then show an error message
		else {
			response.writeHead(404, {
			    	'Content-Type': 'text/html',
			    	'Access-Control-Allow-Origin': '*' });
			response.end('<html><head><title>404 - No link stored with given id</title></head><body><h1>No link stored with given id.</h1></body></html>');
		}
		
	}
	// Only GET and POST are supported methods
	else {
		response.writeHead(405, {
			    	'Content-Type': 'text/html',
			    	'Access-Control-Allow-Origin': '*' });
    	response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
	}


}).listen(process.env.PORT || 5000);




