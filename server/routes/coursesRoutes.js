import express from 'express';
import { getAllCourses, getCourseById } from '../controllers/coursesControllers.js';

const router = express.Router();

// /api/courses

router.get('/', getAllCourses); // get all courses
router.get('/:courseId', getCourseById); // get course by course id

export default router;