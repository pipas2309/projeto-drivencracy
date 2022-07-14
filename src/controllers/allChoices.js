import { findChoices, findPolls } from "../db/database.js";

export async function allChoices(req, res) {
   //trycatch
    const { id } = req.params;
    try {
        const choices = await findChoices(id);

        res.send(choices).status(200);
        return;

    } catch (error) {
        res.sendStatus(500);
        return;
    }    
}