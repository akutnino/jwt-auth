import express, { Router, Request, Response } from 'express';
import { PRIVATE_SECRET_KEY, UserFindType } from './auth.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import Users from '../db.js';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const errorObject = { errors: [{ msg: 'This user already exits.' }] };

	const userObject: UserFindType = Users.find((user) => user.email === email);
	if (userObject === undefined) return res.status(400).json(errorObject) as never;

	const isMatch: boolean = await bcrypt.compare(password, userObject.password);
	if (!isMatch) return res.status(400).json(errorObject) as never;

	const token = JWT.sign({ email }, PRIVATE_SECRET_KEY, {
		expiresIn: 60000 * 60,
	});
	res.status(200).json({ token });
});

export { router as login };
