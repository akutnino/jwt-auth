import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router: Router = express.Router();

const baseAuthChain = [
	check('email', 'Please provide a valid email.').isEmail(),
	check('password', 'Please provide a valid password.').isLength({ min: 6 }),
];

router.post('/signup', baseAuthChain, (req: Request, res: Response) => {
	const { password, email } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
	res.send('Validation Passed');

	console.log(password, email);
});

export { router as auth };
