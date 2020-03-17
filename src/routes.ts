export default [
	{
		outlet: 'articles',
		path: 'articles/{category}/{page}',
		defaultRoute: true,
		defaultParams: {
			category: 'news',
			page: '1'
		}
	},
	{
		outlet: 'article',
		path: 'article/{id}'
	}
];
