import express, { Express, Request, Response } from 'express';

const PORT = 8000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
	res.send('HELLO FROM EXPRESS + TS!!!!');
	console.log(req);
});

app.listen(PORT, () => {
	console.log(`now listening on port: ${PORT}`);
});
