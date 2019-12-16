var jsdom = require('jsdom');
var fs = require('fs');


class Users {
	
	getUsers (search) {

		var html = fs.readFileSync("db/users.html", 'utf8');

		const { JSDOM } = jsdom;
		var { window } = new JSDOM(html);
		const { document } = (new JSDOM()).window;
		global.document = document;

		let jQuery;
		var $ = jQuery = require('jquery')(window);

		let users = [];

		$( 'ul li' ).each(function(value, test) {

			if (!search || $(this).text().toLowerCase().includes(search.toLowerCase())) {

				let user = {
					"name": $(this).text(),
					"username": $(this).attr("username"),
					"password": $(this).attr("password")
				}

				users.push(user);
			}
		});


		return users;
	}
}

module.exports = Users;