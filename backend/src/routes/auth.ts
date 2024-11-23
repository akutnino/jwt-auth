import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Users from '../db.js';

export type UserObect = {
	email: string;
	password: string;
};

type UserFindType = UserObect | undefined;

const router: Router = express.Router();

const baseAuthChain = [
	check('email', 'Please provide a valid email.').isEmail(),
	check('password', 'Please provide a valid password.').isLength({ min: 6 }),
];

router.post('/signup', baseAuthChain, async (req: Request, res: Response) => {
	const { password, email } = req.body;
	const errors = validationResult(req);
	const SALT_ROUNDS = 10;

	// VALIDATE USER INPUT
	if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

	// VALIDATE IF USER EXIST
	const userObject: UserFindType = Users.find((user) => user.email === email);

	// prettier-ignore
	if (userObject?.email) res.status(400).json({
			errors: { msg: 'This user already exits.' },
	});

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	Users.push({ email, password: hashedPassword });
	console.log(password, email);

	res.send('Validation Passed');
});

export { router as auth };
