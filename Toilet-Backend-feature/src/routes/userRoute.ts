import express from 'express';
import { updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.put('/:uid', updateUser);
router.delete('/', deleteUser);

export default router;
