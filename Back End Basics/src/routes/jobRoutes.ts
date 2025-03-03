import express from 'express';
const router = express.Router();
import { getJobs } from '../controllers/jobController';
router.get('/', getJobs);
export default router;