import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import Link from '@dojo/framework/routing/Link';

import * as css from './Menu.m.css';

const logo = require('./logo.svg');

export interface MenuProperties {}

const categories = [
	['news', 'Top'],
	['newest', 'New'],
	['show', 'Show'],
	['ask', 'Ask'],
	['jobs', 'Jobs']
];

const factory = create({ icache });

export default factory(function Menu({ middleware: { icache } }) {
	const checked = icache.getOrSet('checked', false);
	function closeMenu() {
		icache.set('checked', !icache.getOrSet('checked', false));
	}
	return (
		<section classes={[css.topNav]}>
			<Link to="articles" params={{ page: '1', category: 'news' }} onClick={closeMenu}>
				<img src={logo} alt="Home" classes={[css.logoLoaded]} />
			</Link>
			<input checked={checked} onclick={closeMenu} id="toggle" classes={[css.menuToggle]} type="checkbox" />
			<label classes={[css.menuButtonContainer]} for="toggle">
				<div classes={[css.menuButton]}></div>
			</label>
			<ul focus={() => checked} classes={[css.menu]}>
				{categories.map(([category, label]) => (
					<li classes={[css.menuItem]} key={category}>
						<ActiveLink
							classes={[css.menuLink]}
							onClick={closeMenu}
							activeClasses={[]}
							to="articles"
							params={{ category, page: '1' }}
							matchParams={{ category }}
						>
							{label}
						</ActiveLink>
					</li>
				))}
			</ul>
		</section>
	);
});
