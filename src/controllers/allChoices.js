import { findChoices, findPolls } from "../db/database.js";

export async function allChoices(req, res) {
   //trycatch
    const { id } = req.params;
    try {
        const choices = await findChoices(id);

        if(!choices[0]) {
            res.sendStatus(404);
            return;  
        }
        res.send(choices).status(200);
        return;

    } catch (error) {
        res.sendStatus(500);
        return;
    }    
}