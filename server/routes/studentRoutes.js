import express from 'express';
import { registerStudent, loginStudent, getAllStudentInformation } from '../controllers/studentControllers.js';

const router = express.Router();

// /api/students

router.post('/register', registerStudent); // register a student
router.post('/login', loginStudent); // login a student
router.get('/:studentId', getAllStudentInformation); // get all student information by student id
//router.get('/:studentId/classes', getStudentClasses); // get all classes for a student by student_id

export default router;