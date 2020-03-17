import { create, tsx } from '@dojo/framework/core/vdom';
import data from '@dojo/framework/core/middleware/data';
import Link from '@dojo/framework/routing/Link';
import Pagination from './Pagination';

import * as css from './ArticleList.m.css';

interface ArticleListProperties {
	category: string;
	page: number;
}

const factory = create({ data }).properties<ArticleListProperties>();

export default factory(function ArticleList({ properties, middleware: { data } }) {
	const { getOrRead, setOptions, getOptions, getTotal } = data();
	const { category, page } = properties();
	setOptions({ pageNumber: page, pageSize: 30, query: { category } });
	const articles = getOrRead(getOptions());
	const total = getTotal(getOptions()) || 0;
	return (
		<div classes={[css.root]}>
			<Pagination page={page} totalPages={Math.ceil(total / 30)} />
			{articles ? (
				<ul>
					{articles.map((article: any) => (
						<li key={article.id} classes={[css.newsItem]}>
							<span classes={[css.score]}>{article.score}</span>
							<span>
								{category !== 'ask' ? (
									<a href={article.url} target="_blank" rel="noopener">
										{article.title}
									</a>
								) : (
									<Link to="article" params={{ id: article.id }}>
										{article.title}
									</Link>
								)}
								{article.domain && <span classes={[css.host]}>{` (${article.domain})`}</span>}
							</span>
							<br />
							<span classes={[css.meta]}>
								<span>
									by<a href="/user/mholt">{` ${article.user}`}</a>
								</span>
								<span>5 hours ago </span>
								<span>
									|
									<Link
										to="article"
										params={{ id: article.id }}
									>{` ${article.comments_count} comments`}</Link>
								</span>
							</span>
						</li>
					))}
				</ul>
			) : (
				<ul>
					<li key="article-loading">Loading...</li>
				</ul>
			)}
		</div>
	);
});
