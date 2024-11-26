import { UserObect } from './routes/auth.js';

type PostsObject = {
	title: string;
	content: string;
};

const Users: UserObect[] = [
	{
		email: 'nino@gmail.com',
		password: '123456789',
	},
];

const PublicPosts: PostsObject[] = [
	{
		title: 'Free Tips on Development',
		content: 'These are some tips',
	},
	{
		title: 'Free Tips on Farmers',
		content: 'These are some tips',
	},
	{
		title: 'Free Tips on Students',
		content: 'These are some tips',
	},
];

const PrivatePosts: PostsObject[] = [
	{
		title: 'Paid Tips on Farmers',
		content: 'These are some tips',
	},
	{
		title: 'Paid Tips on Students',
		content: 'These are some tips',
	},
];

export { Users as default, PublicPosts, PrivatePosts };
