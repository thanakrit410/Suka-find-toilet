import express from 'express';
import { createToilet, getAlltoiletPrivate } from '../controllers/toiletController';
import { authentication } from '../middleware/verifyHeader';

const router = express.Router();
router.get('/', getAlltoiletPrivate);
// router.use(authentication);
router.post('/', createToilet);

export default router;
