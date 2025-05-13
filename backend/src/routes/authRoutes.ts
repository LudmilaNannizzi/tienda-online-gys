"use client";
import express from 'express';
import { login, signup, createAdmin, logout } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/create-admin', createAdmin);
router.post('/logout', logout);

export default router; 