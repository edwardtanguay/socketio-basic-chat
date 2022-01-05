import http from 'http';
import path from 'path';
import express from 'express';
import { Server as socketIO } from 'socket.io';

const app = express();
const PORT = 5011;
const __dirname = path.resolve(path.dirname(''));
const server = http.Server(app);
const io = new socketIO(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('user connected');
	socket.emit('greeting-from-server', {
		greeting: 'you loaded the page'
	});
	socket.on('greeting-from-client', (data) => {
		console.log(data);
	})
})

server.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
})