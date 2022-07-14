import express from 'express';
import { choice } from '../controllers/choice.js';
import { vote } from '../controllers/vote.js';
import validateChoice from '../middlewares/validateChoice.js';


const router = express.Router();

router.post("", validateChoice, choice);
router.post("/:id/vote", vote);

export default router;