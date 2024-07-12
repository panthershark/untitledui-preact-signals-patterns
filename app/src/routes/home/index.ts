import { lazy } from 'preact/compat';

export default lazy(() => import('./home').then(({ Home }) => Home));
