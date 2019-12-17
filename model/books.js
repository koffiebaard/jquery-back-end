var jsdom = require('jsdom');
var fs = require('fs');

var db_file = "db/books.html";

class Books {

	getBooks (search) {

		var html = fs.readFileSync(db_file, 'utf8');

		const { JSDOM } = jsdom;
		var { window } = new JSDOM(html);
		const { document } = (new JSDOM()).window;
		global.document = document;

		let jQuery;
		var $ = jQuery = require('jquery')(window);

		let books = [];

		$( 'ul li' ).each(function(value, test) {

			if (!search || $(this).text().toLowerCase().includes(search.toLowerCase())) {

				let book = {
					"name": $(this).text(),
					"number_of_pages": $(this).attr("number_of_pages")
				}
				
				books.push(book);
			}
		});


		return books;
	}

	addBook (book) {

		var html = fs.readFileSync(db_file, 'utf8');

		const { JSDOM } = jsdom;
		var { window } = new JSDOM(html);
		const { document } = (new JSDOM()).window;
		global.document = document;

		let jQuery;
		var $ = jQuery = require('jquery')(window);

		$('<li/>', {
			"text": book.name,
			"author": book.author,
			"number_of_pages": book.number_of_pages
		}).appendTo('ul');

		// console.log(window.document.documentElement.outerHTML);

		fs.writeFileSync(db_file, window.document.documentElement.outerHTML, { mode: 0o755 });

		return true;
	}
}

module.exports = Books;