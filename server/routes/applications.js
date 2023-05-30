import { Router } from 'express';
import {
  applications,
  getAllApplications,
  closedApplication,
} from '../controllers/applications.js';

const router = new Router();

// http://localhost:3002/api/applications/
router.post('/', applications);

// http://localhost:3002/api/applications/
router.get('/', getAllApplications);

// http://localhost:3002/api/applications/closed
router.post('/closed', closedApplication);

export default router;
