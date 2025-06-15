import express from 'express'
import { login, register } from '../controllers/userController.js';

const router = express.Router();

// user register
//@api-> /api/user/register
router.post('/register', register);

// user login
//@api-> /api/user/login
router.post('/login', login)



export default router;