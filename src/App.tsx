import { create, tsx } from '@dojo/framework/core/vdom';
import { createResource } from '@dojo/framework/core/resource';
import Outlet from '@dojo/framework/routing/Outlet';

import * as css from './App.m.css';
import ArticleList from './ArticleList';
import Menu from './Menu';
import Article from './Article';

const factory = create();

const requestCounter = new Map<string, number>();

setInterval(() => {
	requestCounter.clear();
}, 1000);

const articleListResource = createResource({
	read: async ({ offset = 0, size = 10, query = [{ keys: ['category'], value: 'news' }] }) => {
		const page = Math.max(Math.ceil(offset / size) + 1, 1);
		const [categoryQuery] = query;

		const key = `${offset}-${size}-${JSON.stringify(query)}`;
		let currentRequestCount = requestCounter.get(key) || 0;
		requestCounter.set(key, ++currentRequestCount);

		if (currentRequestCount > 10) {
			console.log('error due to infinite looping!', offset, size, query);
			throw new Error(`Infinite request for key: ${key}`);
		}

		const response = await fetch(`https://api.hnpwa.com/v0/${categoryQuery.value}/${page}.json`);
		const data = await response.json();

		console.log('fetching!', offset, size, query, data);

		return {
			data,
			total: 90
		};
	}
});

const articleResource = createResource({
	read: async ({ query = [] }) => {
		const [idQuery] = query;
		if (!idQuery.value) {
			return {
				data: [],
				total: 0
			};
		}
		const response = await fetch(`https://node-hnapi.herokuapp.com/item/${idQuery.value}`);
		const data = await response.json();

		return {
			data: [data],
			total: 0
		};
	}
});

export default factory(function App() {
	return (
		<div classes={[css.root]}>
			<Menu />
			<div styles={{ paddingTop: '50px' }}>
				<Outlet
					id="articles"
					renderer={(details) => {
						return (
							<ArticleList
								resource={articleListResource}
								category={details.params.category}
								page={parseInt(details.params.page, 10)}
							/>
						);
					}}
				/>
				<Outlet
					id="article"
					renderer={(details) => {
						return <Article resource={articleResource} id={details.params.id} />;
					}}
				/>
			</div>
		</div>
	);
});
