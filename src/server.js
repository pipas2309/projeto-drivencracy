import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 4500;

const server = express();

server.use(cors());
server.use(json());


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});