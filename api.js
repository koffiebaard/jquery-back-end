#!/usr/bin/env node

var jsdom = require('jsdom');
var fs = require('fs');
var Internals = require('./lib/internals.js');
const querystring = require('querystring');
var BookController = require('./controller/books.js');
var UserController = require('./controller/users.js');

var internals = new Internals();

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

	if ( $(this).attr("method") == request_method && $(this).attr("href") == request_endpoint ) {
		route = $(this).text();
	}
});


if (route == "home") {

	internals.send(200, {"Welcome": "to the jQuery back-end."});
}
else if (route == "add_book") {

	let books = new BookController();
	books.addBook();
}
else if (route == "get_books") {
	
	let books = new BookController();
	books.getBooks(request_params);
}
else if (route == "get_users") {

	let users = new UserController();
	users.getUsers(request_params);
}
else {

	internals.send(404, {"error": "404 not found"});
}