import { newVote } from "../db/database.js";

export async function vote(req, res) {
   //trycatch
    const { id } = req.params;
    try {
        const vote = await newVote(id);

        if(vote === '404' || vote === 'error') {
            res.sendStatus(404);
            return;
        }

        if(vote === '403') {
            res.sendStatus(403);
            return;
        }

        if(vote === 'created') {
            res.sendStatus(201);
            return;
        }


    } catch (error) {
        res.sendStatus(500);
        return;
    }    
}