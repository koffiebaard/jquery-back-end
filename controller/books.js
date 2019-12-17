var Internals = require('../lib/internals.js');
var BookModel = require('../model/books.js');

var internals = new Internals();

class BookController {
	
	addBook() {

		internals.readSTDIN(function(book_addition) {

			let books = new BookModel();
			let book_added = books.addBook(book_addition)

			if (book_added) {
				internals.send(200, {"message": "Book was successfully added."});
			} else {
				internals.send(400, {"error": "Book was not added."});
			}
		});
	}

	getBooks(request_params) {

		let books = new BookModel();

		if (request_params.search) {
			internals.send(200, books.getBooks(request_params.search));
		} else {
			internals.send(200, books.getBooks());
		}
	}
}

module.exports = BookController;