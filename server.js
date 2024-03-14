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


express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});