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

export async function newChoice(choice) { 
    
    try {
        // Exist poll check
        const checkPollId = await db.collection('polls').findOne({_id: new ObjectId(choice.poolId)});

        if(!checkPollId) {
            return '404';
        }

        // Same choice Check
        const checkChoicesTitles = await db.collection('choices').findOne( {title: choice.title} );

        if(checkChoicesTitles) {
            return '409';
        }

        // Expire check
        const expireDateUnix = dayjs(checkPollId.expireAt).unix()
        const todayDateUnix = dayjs().unix()
    
        if(expireDateUnix - todayDateUnix < 0) {
            return '403';
        }

        await db.collection('choices').insertOne(choice)
        return;

    } catch (error) {
        return 'error';
    }
}