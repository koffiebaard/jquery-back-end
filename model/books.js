var jsdom = require('jsdom');
var fs = require('fs');


class Books {

	getBooks (search) {

		var html = fs.readFileSync("db/books.html", 'utf8');

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
}

module.exports = Books;