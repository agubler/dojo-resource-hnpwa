import { create, tsx } from '@dojo/framework/core/vdom';
import data from '@dojo/framework/core/middleware/data';

import Comments from './Comments';
import * as css from './Article.m.css';

interface ArticleProperties {
	id: string;
}

const factory = create({ data }).properties<ArticleProperties>();

export default factory(function Article({ properties, middleware: { data } }) {
	const { getOrRead, setOptions, getOptions } = data();
	const { id } = properties();
	setOptions({ ...getOptions, pageSize: 1, pageNumber: 1, query: { id } });
	const [article = undefined] = getOrRead(getOptions()) || [];
	if (!article) {
		return null;
	}

	return (
		<div classes={[css.root]}>
			<div classes={[css.item]}>
				<a href={article.url} target="_blank" rel="noopener">
					<h1 classes={[css.title]}>{article.title}</h1>
				</a>
				<span classes={[css.host]}>{`(${article.domain})`}</span>
				<p classes={[css.meta]}>
					{`${article.points} points | by `}
					<a href="">{article.user} </a>
					{article.time_ago}
				</p>
			</div>
			{article.comments && (
				<div classes={[css.commentsContainer]}>
					<p classes={[css.commentsHeader]}>71 comments</p>
					<Comments comments={article.comments} />
				</div>
			)}
		</div>
	);
});
