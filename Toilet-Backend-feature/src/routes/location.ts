import express from 'express';
import { createLocation, getAllLocation } from '../controllers/locationController';
import { authentication } from '../middleware/verifyHeader';

const router = express.Router();
router.get('/', getAllLocation);
// router.use(authentication);
router.post('/', createLocation);

export default router;
