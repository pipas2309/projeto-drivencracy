import joi from "joi";

const pollSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.string().min(0).required()
});

const choiceSchema = joi.object({
    title: joi.string().min(1).required(),
    poolId: joi.string().min(1).required()
});


export async function pollValidate(poll) {
    try {
        const allowedPollData = await pollSchema.validateAsync(poll);
        return allowedPollData;

    } catch (error) {
        console.log(error);
        return 'error';
    }
    
}

export async function choiceValidate(choice) { //falta conferir se é repetido

    try {
        const allowedchoiceData = await choiceSchema.validateAsync(choice, { abortEarly: false });
        return allowedchoiceData;

    } catch (error) {
        console.log(error);
        return 'error';
    }
    
}

export async function voteValidate(vote) {
    try {
        const allowedvoteData = await voteSchema.validateAsync(vote, { abortEarly: false });
        return allowedvoteData

    } catch (error) {
        console.log(error);
        return 'error';
    }
    
}