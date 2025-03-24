import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

// Routes
router.get('/', getUsers); // Get all users
router.post('/', createUser); // Create a new user

export default router;
