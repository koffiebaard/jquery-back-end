#!/usr/bin/env node

var jsdom = require('jsdom');
var fs = require('fs');
const querystring = require('querystring');
var Books = require('./model/books.js');
var Users = require('./model/users.js');

// Set request data
request_method = process.env.REQUEST_METHOD;
request_endpoint = process.env.DOCUMENT_URI;
let request_query_string = process.env.QUERY_STRING
request_params = querystring.parse(request_query_string);


var html = fs.readFileSync("routes.html", 'utf8');

const { JSDOM } = jsdom;
var { window } = new JSDOM(html);
const { document } = (new JSDOM()).window;
global.document = document;

$ = jQuery = require('jquery')(window);

var route;

// Go through routes and see which one we need
$("a").each(function(value, test) {
	let routeElem = $(this).text();

	if ( $(this).attr("method") == request_method && $(this).attr("href") == request_endpoint ) {
		route = $(this).text();
	}
});

// Set content type
console.log('Content-type: application/json');

if (route == "home") {

	console.log("Status: 200", "\n\n", {"Welcome": "to the jQuery back-end."});
}
else if (route == "get_books") {
	
	let books = new Books();

	console.log("Status: 200", "\n");

	if (request_params.search) {
		console.log(books.getBooks(request_params.search));
	} else {
		console.log(books.getBooks());
	}
}
else if (route == "get_users") {

	let users = new Users();

	console.log("Status: 200", "\n");

	if (request_params.search) {
		let search_string = request_params.search;
		console.log(users.getUsers(search_string));
	} else {
		console.log(users.getUsers());
	}
}
else {
	console.log("Status: 404", "\n\n", {"error": "404 not found"});
}