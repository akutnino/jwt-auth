import express, { Router, Request, Response } from 'express';
import { PrivatePosts, PublicPosts } from '../db.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router: Router = express.Router();

router.get('/public', (req: Request, res: Response) => {
	res.json(PublicPosts);
});

router.get('/private', checkAuth, (req: Request, res: Response) => {
	res.json(PrivatePosts);
});

export { router as posts };
