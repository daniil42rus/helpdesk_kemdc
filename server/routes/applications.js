import { Router } from 'express';
import {
  applications,
  getAllApplications,
} from '../controllers/applications.js';

const router = new Router();

// Register
// http://localhost:3002/api/applications/post

router.post('/', applications);

// http://localhost:3002/api/applications/get

router.get('/', getAllApplications);

export default router;
