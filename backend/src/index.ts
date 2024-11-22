import express, { Express } from 'express';
import { auth } from './routes/auth.js';
import { root } from './routes/root.js';

const PORT: number = 8000;
const app: Express = express();

// built-in middleware for json
app.use(express.json());

// routes
app.use('/', root);
app.use('/auth', auth);

app.listen(PORT, () => {
	console.log(`now listening on port: ${PORT}`);
});
