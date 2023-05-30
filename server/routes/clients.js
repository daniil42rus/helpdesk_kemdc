import { Router } from 'express';
import {
  clients,
  getAllClients,
} from '../controllers/clients.js';

const router = new Router();

// http://localhost:3002/api/clients/
router.post('/', clients);

// http://localhost:3002/api/clients/
router.get('/', getAllClients);

export default router;
