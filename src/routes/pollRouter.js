import express from 'express';
import { poll } from '../controllers/poll.js';
import validatePoll from '../middlewares/validatePoll.js';


const router = express.Router();

router.post("", validatePoll, poll);
//router.get("", );
//router.get("/:id/choice", );
//router.get("/:id/result", );

export default router;