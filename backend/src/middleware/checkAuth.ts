import { Request, Response, NextFunction } from 'express';
import { PRIVATE_SECRET_KEY } from '../routes/auth.js';
import JWT from 'jsonwebtoken';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-auth-token');
	const errorObject = { errors: [{ msg: 'No token found' }] };

	// Check if the user JWT is valid
	if (!token) return res.status(400).json(errorObject) as never;

	try {
		JWT.verify(token, PRIVATE_SECRET_KEY); //returns the payload of the JWT.
		return next();
	} catch (error) {
		return res.status(400).json(error) as never;
	}
};

export { checkAuth };
