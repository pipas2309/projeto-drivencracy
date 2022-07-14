

async function validateVote(req, res, next) {
    try {
        const vote = req.params;
        const joiValidate = await signInJoi(user);

        if(!joiValidate) { // verificar se existe opção (404) e se a enquete não espirou (403)
            console.log('Falha na validação JOI voteValidate()');
            res.status(422).send("Insira um email e senha válido!");
            return;
        }
        console.log(user)

        res.locals.user = user;
        next();
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateVote;