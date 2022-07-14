import { pollValidate } from "../models/joiSchemas.js";

async function validatePoll(req, res, next) {
    try {
        const poll = req.body;

        const joiValidate = await pollValidate(poll);

        if(joiValidate === 'error') {
            console.log('Falha na validação JOI pollValidate()');
            res.status(422).send("Enquete inválida, revise as propriedades do objeto enviado!");
            return;
        }
        console.log(poll)

        res.locals.poll = poll;
        next();
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validatePoll;