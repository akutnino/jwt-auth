import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
	const { password, email } = req.body;

	res.send('Auth route working');

	console.log(password, email);
});

export { router as auth };
