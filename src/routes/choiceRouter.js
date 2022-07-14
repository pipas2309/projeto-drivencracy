import express from 'express';
import { choice } from '../controllers/choice.js';
import validateChoice from '../middlewares/validateChoice.js';


const router = express.Router();

router.post("", validateChoice, choice);
//.post("/:id/vote", );

export default router;