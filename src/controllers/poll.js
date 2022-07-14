import dayjs from "dayjs";
import { createPoll } from "../db/database.js";

export async function poll(req, res) {
    const poll = res.locals.poll;

    const create = createPoll(poll);

    //const hoje = dayjs().format('YYYY-MM-DD HH:mm')
    //const xx = dayjs().add(30, 'day');
    //const x = dayjs(xx).format('YYYY-MM-DD HH:mm') 
    //const diff = dayjs(poll.expireAt).unix() - dayjs(hoje).unix();
    //const x = dayjs(poll.expireAt).toNow()

    res.sendStatus(201)
}