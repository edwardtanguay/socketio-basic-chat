import express from 'express';
import { Server as socketIO } from 'socket.io';

const app = express();
const PORT = 5011;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
})