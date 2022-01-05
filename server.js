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
	
	// setInterval(() => {
	// 	socket.emit('reminder', {
	// 		greeting: 'this is a reminder ' + Math.random() 
	// 	});
	// }, 1000);

	// socket.on('greeting', (data) => {
	// 	console.log(data);
	// });

	socket.on('message', (data) => {
		console.log(data);
		io.emit('message', data);	
	});
})

server.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
})