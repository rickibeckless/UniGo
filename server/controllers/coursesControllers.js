import { pool } from '../config/connections.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await pool.query('SELECT * FROM courses');
        res.status(200).send(courses.rows);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getCourseById = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await pool.query('SELECT * FROM courses WHERE course_id = $1', [courseId]);
        res.status(200).send(course.rows);
    } catch (error) {
        res.status(400).send(error);
    }
};