import express from 'express';
import { createComment, getComment } from '../controllers/commentController';

const router = express.Router();
router.get('/', getComment);
router.post('/', createComment);

export default router;
