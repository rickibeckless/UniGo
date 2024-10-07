import { pool } from '../config/connections.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const student = await pool.query('INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
        res.status(201).send(student.rows[0]);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {        
        const students = await pool.query('SELECT * FROM students WHERE email = $1 AND password = $2', [email, password]);

        if (students.rows.length === 0) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: students.rows[0].student_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};