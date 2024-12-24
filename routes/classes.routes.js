import express from 'express';

import { getClasses } from '../controllers/classes.controllers.js';

const router = express.Router();

router.get('/', getClasses);

export default router;
