import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

import * as css from './Comments.m.css';

interface CommentsProperties {
	comments: any[];
}

const factory = create({ icache }).properties<CommentsProperties>();

const CommentsWidget = factory(function Comments({ properties, middleware: { icache } }) {
	const { comments } = properties();

	return (
		<ul classes={[css.root]}>
			{comments.map((comment) => {
				const open = icache.getOrSet(comment.id, false);
				const hasComments = !!(comment.comments && comment.comments.length);
				return (
					<li classes={[css.comment]}>
						<div classes={[css.by]}>
							<p>{comment.user}</p>
							{` ${comment.time_ago} `}
						</div>
						<div classes={[css.text]} innerHTML={comment.content} />
						{hasComments && (
							<div classes={[css.toggle, open && css.open]}>
								<a
									onclick={(event) => {
										event.preventDefault();
										icache.set(comment.id, !icache.getOrSet(comment.id, true));
									}}
								>
									{open ? '[-]' : '[+]'}
								</a>
							</div>
						)}
						{hasComments && open && <CommentsWidget comments={comment.comments} />}
					</li>
				);
			})}
		</ul>
	);
});

export default CommentsWidget;
