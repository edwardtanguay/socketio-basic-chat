import http from 'http';
import path from 'path';
import express from 'express';
import { Server as socketIO } from 'socket.io';

const app = express();
const PORT = 5011;
const __dirname = path.resolve(path.dirname(''));
const server = http.Server(app);
const io = new socketIO(server);

const quotes = [
	"The fact that I'm using words doesn’t necessarily mean that I’m saying anything.",
	"There is no communication that is so simple that it cannot be misunderstood.",
	"Don't assume that prior communication has been effective and that people get it.",
	"Your aim in conversation should not be to persuade, but to clarify.",
	"Rational discussion is useful only when there is a significant base of shared assumptions.",
	"Every problem seems to start with bad communication. Someone isn't listening.",
	"Good communication is just as stimulating as black coffee, and just as hard to sleep after."
];
let currentQuoteIndex = 0;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

const showQuote = (socket) => {
	const quote = quotes[currentQuoteIndex];
	socket.emit('quote', quote);
	currentQuoteIndex++;
	if (currentQuoteIndex > quotes.length - 1) {
		currentQuoteIndex = 0;
	}
}

io.on('connection', (socket) => {

	showQuote(socket);

	setInterval(() => {
		showQuote(socket);
	}, 7000);

	socket.on('greeting', (data) => {
		console.log(data);
	});

	socket.on('message', (data) => {
		io.emit('message', data);
	});
})

server.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
})