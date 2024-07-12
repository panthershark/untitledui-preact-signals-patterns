import { lazy } from 'preact/compat';

export default lazy(() => import('./thing').then(({ Thing }) => Thing));
