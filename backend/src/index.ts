import express, { Express } from 'express';
import { auth } from './routes/auth.js';
import { root } from './routes/root.js';
import { users } from './routes/users.js';
import { login } from './routes/login.js';
import { posts } from './routes/post.js';

const PORT: number = 8000;
const app: Express = express();

// built-in middleware for json
app.use(express.json());

// routes
app.use('/', root);
app.use('/auth', auth);
app.use('/login', login);
app.use('/users', users);
app.use('/posts', posts);

app.listen(PORT, () => {
	console.log(`now listening on port: ${PORT}`);
});
