import express from 'express';
import { allChoices } from '../controllers/allChoices.js';
import { allPolls } from '../controllers/allPolls.js';
import { poll } from '../controllers/poll.js';
import { result } from '../controllers/result.js';
import validatePoll from '../middlewares/validatePoll.js';


const router = express.Router();

router.post("", validatePoll, poll);
router.get("", allPolls);
router.get("/:id/choice", allChoices);
router.get("/:id/result", result);

export default router;