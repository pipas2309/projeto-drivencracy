import db  from './mongodb.js';
import { ObjectId } from 'mongodb';
import dayjs from "dayjs";

export async function createPoll(poll) { //finished
    try {
        let newPoll = {...poll};

        const isValidDate = dayjs(poll.expireAt).isValid();

        console.log(isValidDate, ' é valido?')
        console.log(dayjs(poll.expireAt))

        if(!isValidDate) { // if invalid expire data

            const newExpireDate = dayjs().add(30, 'day');

            const expireAtFormated = dayjs(newExpireDate).format('YYYY-MM-DD HH:mm');       
          
            newPoll = {
                ...poll, 
                expireAt: expireAtFormated
            };
        }

        await db.collection('polls').insertOne(newPoll);
        console.log(newPoll);
        return 'created';

    } catch (error) {
        console.error(error);
        return 'error';
    }
};

export async function findPolls() { //finished
    try {
        const pollsOnDatabase = await db.collection('polls').find().toArray();

        return pollsOnDatabase;

      } catch (error) {
        console.error(error);
        return 'error';
      }
}

export async function newChoice(choice) { //finished
    console.log(choice, 'no db')
    
    try {
        // Exist poll check
        const checkPollId = await db.collection('polls').findOne({_id: new ObjectId(choice.poolId)});

        if(!checkPollId) {
            console.log('404')
            return '404';

        }

        // Same choice Check
        const checkChoicesTitles = await db.collection('choices').findOne( {title: choice.title} );

        if(checkChoicesTitles) {
            console.log('409')
            return '409';
        }

        // Expire check
        const expireDateUnix = dayjs(checkPollId.expireAt).unix()
        const todayDateUnix = dayjs().unix()
    
        if(expireDateUnix - todayDateUnix < 0) {
            console.log('403')
            return '403';
        }

        await db.collection('choices').insertOne(choice)
        return;

    } catch (error) {
        console.log('erro aqui\n\n', error, '\n\nesse foi o erro\n\n');
        return 'error';
    }
}

export async function findChoices(id) { //finished
    try {
        const choicesOnDatabase = await db.collection('choices').find({poolId: id}).toArray();

        return choicesOnDatabase;

      } catch (error) {
        console.error(error);
        return 'error';
      }
}

export async function newVote(id) { //finished
    console.log(id, 'id no db')
    
    try {
        const checkChoiceId = await db.collection('choices').findOne({_id: new ObjectId(id)});
        console.log(checkChoiceId)
        if(!checkChoiceId) {
            console.log('x')
            return '404';
        }

        const checkPollId = await db.collection('polls').findOne({_id: new ObjectId(checkChoiceId.poolId)});

        const expireDateUnix = dayjs(checkPollId.expireAt).unix()
        const todayDateUnix = dayjs().unix()
        console.log(checkPollId)
        if(expireDateUnix - todayDateUnix < 0) {
            console.log('403')
            return '403';
        }

        const newVote = {
            choiceId: id,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm')
        }

        await db.collection('votes').insertOne(newVote);

        return 'created';

    } catch (error) {
        return 'error';
    }
}

export async function pollResult(id) { //finished
    try {
        // Exist poll check
        const checkPollId = await db.collection('polls').findOne({_id: new ObjectId(id)});
        console.log(checkPollId)

        if(!checkPollId) {
            console.log('404')
            return '404';
        }

        const choicesOnDatabase = await db.collection('choices').find({poolId: id}).toArray();
        let result = {
            title: "",
            votes: 0
        };
        let aux = 0;

        for(let i = 0; i < choicesOnDatabase.length; i++) {
            console.log(ObjectId(choicesOnDatabase[i]._id).toString(), i, 'oiiii')
            aux = await (await db.collection('votes').find({choiceId: ObjectId(choicesOnDatabase[i]._id).toString()}).toArray()).length

            if(aux > result.votes) {
                result.votes = aux
                result.title = choicesOnDatabase[i].title
            }
        }

        const finalResult = {
            ...checkPollId,
            result
        }
        
        return finalResult;

      } catch (error) {
        return 'error';
      }
}