import express from 'express';
import { getProfile, signin, signup } from '../controllers/authController';
import { authentication } from '../middleware/verifyHeader';
import { signUpValidation, validate } from '../middleware/vaildator';

const router = express.Router();

router.post('/signup', signUpValidation(), validate, signup);
router.post('/signin', signin);
router.use(authentication);
router.get('/me', getProfile);

export default router;