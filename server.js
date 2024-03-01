http = require('http');
fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile('tasks.json', 'utf8', (err, data) => {
			if (err) {
					res.writeHead(500, {'Content-Type': 'text/plain'});
					res.end("Error reading file.");
					return;
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(data);
	});
});
//ver running at http://localhost:3000/");
//});
