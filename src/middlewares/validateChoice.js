import { choiceValidate } from "../models/joiSchemas.js";

async function validateChoice(req, res, next) {
    try {
        const choice = req.body;
        const joiValidate = await choiceValidate(choice);

        if(!joiValidate) {
            console.log('Falha na validação JOI choiceValidate()');
            res.status(422).send("Escolha inválida, revise as propriedades do objeto enviado!");
            return;
        }
        console.log(choice);

        res.locals.choice = choice;
        next();
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateChoice;