import { Router } from 'express';
import SchoolController from '../controllers/schoolController.js';
const router = Router();

router.post('/addSchool', SchoolController.addSchool);
router.get('/listSchools', SchoolController.listSchools);
router.get('/allSchools', SchoolController.getAllSchools);

export default router;
