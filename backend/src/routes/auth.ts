import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Users from '../db.js';

const router: Router = express.Router();

const baseAuthChain = [
	check('email', 'Please provide a valid email.').isEmail(),
	check('password', 'Please provide a valid password.').isLength({ min: 6 }),
];

router.post('/signup', baseAuthChain, (req: Request, res: Response) => {
	const { password, email } = req.body;
	const errors = validationResult(req);

	// VALIDATE USER INPUT
	if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

	// VALIDATE IF USER EXIST
	const userObject = Users.find((user) => user.email === email);

	// prettier-ignore
	if (userObject?.email) res.status(400).json({
			errors: { msg: 'This user already exits.' },
	});

	res.send('Validation Passed');

	console.log(password, email);
});

export { router as auth };
