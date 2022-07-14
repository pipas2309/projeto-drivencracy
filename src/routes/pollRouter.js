import express from 'express';
import { allPolls } from '../controllers/allPolls.js';
import { poll } from '../controllers/poll.js';
import validatePoll from '../middlewares/validatePoll.js';


const router = express.Router();

router.post("", validatePoll, poll);
router.get("", allPolls);
//router.get("/:id/choice", );
//router.get("/:id/result", );

export default router;