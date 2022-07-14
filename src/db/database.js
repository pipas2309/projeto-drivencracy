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

        await db.collection('polls').insertOne({ newPoll });
        console.log(newPoll);
        return 'created';

    } catch (error) {
        console.error(error);
        return 'error';
    }
};

async function findUser(user) { //finished
    try {
        const userOnDatabase = await db.collection('users').findOne({ email: user.email });

        if (!userOnDatabase) {
          return 'not found';
        }
    
        return userOnDatabase;

      } catch (error) {
        console.error(error);
        return 'error';
      }
}

async function newToken(user) { 
    
    const lastSession = await db.collection('tokens').findOne({userId: new ObjectId(user._id)});
    const token = uuid();
    const time = Date.now();

    if(lastSession) {
        if(time - lastSession.time < 50000 ) {
            return lastSession;
        }
        try {
            await db.collection('tokens').updateOne({userId: new ObjectId(user._id)},
            {
                $set: {token, time}
            })
            return {
                ...lastSession,
                token,
                time
            };
        } catch (error) {
            return 'error';
        }
    }

    let userData = {
        name: user.name,
        email: user.email,
        userId: user._id,
        token,
        time
    }

    await db.collection('tokens').insertOne(userData);

    return userData;
}