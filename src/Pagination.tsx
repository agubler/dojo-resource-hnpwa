import { create, tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import * as css from './Pagination.m.css';

interface PaginationProperties {
	page: number;
	totalPages: number;
}

const factory = create().properties<PaginationProperties>();

export default factory(function Pagination({ properties }) {
	const { page, totalPages } = properties();
	return (
		<div classes={[css.root]}>
			<Link
				classes={[css.controls]}
				to="articles"
				onClick={(event) => {
					if (page === 1) {
						event.preventDefault();
						return false;
					}
				}}
				isOutlet={page !== 1}
				params={{
					page: `${page - 1}`
				}}
			>
				{'< Prev'}
			</Link>
			<Link
				classes={[css.controls]}
				to="articles"
				onClick={(event) => {
					if (page >= totalPages) {
						event.preventDefault();
						return false;
					}
				}}
				params={{
					page: `${page + 1}`
				}}
			>
				{'Next >'}
			</Link>
		</div>
	);
});
