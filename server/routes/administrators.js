import { Router } from 'express';
import {
  administrators,
  getAllAdministrators,
} from '../controllers/administrators.js';

const router = new Router();

// http://localhost:3002/api/administrators/
router.post('/', administrators);

// http://localhost:3002/api/administrators/
router.get('/', getAllAdministrators);

export default router;
