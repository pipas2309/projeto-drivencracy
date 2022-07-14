import { findPolls } from "../db/database.js";

export async function allPolls(req, res) {
   //trycatch
    const polls = await findPolls();

    if(polls === 'error') {
        res.sendStatus(404);
    }

    res.send(polls)
}