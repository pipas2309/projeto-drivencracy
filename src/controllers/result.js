import { pollResult } from "../db/database.js";

export async function result(req, res) {
   //trycatch
    const { id } = req.params;
    try {
        const vote = await pollResult(id);

        if(vote === '404' || vote === 'error') {
            res.sendStatus(404);
            return;
        }


        res.send(vote).status(200);
        return;


    } catch (error) {
        res.sendStatus(500);
        return;
    }    
}