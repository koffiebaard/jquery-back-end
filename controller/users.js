var Internals = require('../lib/internals.js');
var UserModel = require('../model/users.js');

var internals = new Internals();

class UserController {
	
	getUsers(request_params) {

		let users = new UserModel();

		if (request_params.search) {
			internals.send(200, users.getUsers(request_params.search));
		} else {
			internals.send(200, users.getUsers());
		}
	}
}

module.exports = UserController;