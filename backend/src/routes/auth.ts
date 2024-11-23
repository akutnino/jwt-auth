import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
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
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	// VALIDATE IF USER EXIST
	const userObject: UserFindType = Users.find((user) => user.email === email);

	if (userObject?.email) {
		res.status(400).json({ errors: { msg: 'This user already exits.' } });
		return;
	}

	// HASH THE NEW USER PASSWORD
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	// INSERT THE NEW USER W/ HASHED PASSWORD TO DATABASE
	Users.push({ email, password: hashedPassword });

	// CREATE JWT
	const PRIVATE_SECRET_KEY = 'vw45ghyth6uj678k90l3535ferr4cr';
	const token = JWT.sign({ email }, PRIVATE_SECRET_KEY, {
		expiresIn: 60000 * 60,
	});

	// SEND THE TOKEN BACK TO THE CLIENT
	res.send(token);
});

export { router as auth };
