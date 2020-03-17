import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import './routes';
import App from './App';
import routes from './routes';

const registry = new Registry();
registerRouterInjector(routes, registry);

const r = renderer(() => <App />);
r.mount({ domNode: document.getElementById('app'), registry });
