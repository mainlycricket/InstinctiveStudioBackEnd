import express from 'express';

import { getAcademicYears } from '../controllers/academic_years.controllers.js';

const router = express.Router();

router.get('/', getAcademicYears);

export default router;
