import { newChoice } from "../db/database.js";

export async function choice(req, res) {
    const choice = res.locals.choice;
    //trycatch
    const create = await newChoice(choice);

    if(create === '404') {
        res.sendStatus(404);
        return;
    }

    if(create === '409') {
        res.sendStatus(409);
        return;
    }

    if(create === '403') {
        res.sendStatus(403);
        return;
    }

    res.sendStatus(201);
    return;
}