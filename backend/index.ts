import express, { Express, Request, Response } from 'express';

const PORT = 6000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
	res.send('HELLO WORLD!!!');
});

app.listen(PORT, () => {
	console.log(`now listening on port: ${PORT}`);
});
