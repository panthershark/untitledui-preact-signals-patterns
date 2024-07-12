import { Signal, signal } from '@preact/signals';
import { AppRoute, RoutePath } from './routing/routes';

const _route = signal<AppRoute>({ path: RoutePath.Loading });

export const getCurrentRoute = (): Signal<AppRoute> => _route;
