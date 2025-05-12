"use client";
import express from 'express';
import { login, signup, createAdmin } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/create-admin', createAdmin);

export default router; 