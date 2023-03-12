import express from 'express';
import { searchToilet } from '../controllers/searchController';

const router = express.Router();
router.get('/', searchToilet);

export default router;