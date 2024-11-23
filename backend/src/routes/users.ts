import express, { Router, Request, Response } from 'express';
import Users from '../db.js';

const router: Router = express.Router();

router.get('/all', (req: Request, res: Response) => {
	res.json(Users);
});

export { router as users };
