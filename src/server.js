import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import pollRouter from './routes/pollRouter.js';
import choiceRouter from './routes/choiceRouter.js';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(json());

server.use("/poll", pollRouter);
server.use("/choice", choiceRouter);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});