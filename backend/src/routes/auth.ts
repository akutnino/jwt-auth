import Router, { Express, Request, Response } from 'express';

const router: Express = Router();

router.get('/', (req: Request, res: Response) => {
	res.send('Auth route working');
	console.log(Boolean(req));
});

export { router };
