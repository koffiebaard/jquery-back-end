var readline = require('readline');

class Internals {

	async readSTDIN (callback) {

		var rl = readline.createInterface({
  			input: process.stdin,
			output: process.stdout,
			terminal: false
		});

		let stdin = "";

		rl.on('line', function (line) {
			stdin += line;

			if (line.trim().slice(-1) == "}") {
				rl.close();

				try {
					let object = JSON.parse(stdin);
					callback(object);
				} catch (err) {
					console.error(err);
				}
			}
		});
	}

	send(response_code, payload) {
		console.log('Content-type: application/json');
		console.log(`Status: ${response_code}`, "\n");
		console.log(payload);
	}
}

module.exports = Internals;