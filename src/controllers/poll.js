import { createPoll } from "../db/database.js";

export async function poll(req, res) {
    const poll = res.locals.poll;
    //trycatch
    const create = createPoll(poll);

    res.sendStatus(201)
}