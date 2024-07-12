import { useSignalEffect } from '@preact/signals';
import { RouterOnChangeArgs } from 'preact-router';
import { useState } from 'preact/hooks';
import { getCurrentRoute } from '../app/global';
import { AppRoute, parseRoute, RoutePath } from '../app/routing/routes';

const updateRoute = (a: RouterOnChangeArgs) => {
	const currentRoute = getCurrentRoute();
	currentRoute.value = parseRoute(a);
};

// useCurrentRoute: always returns the current route and trigger re-render anytime it changes.
export const useCurrentRoute = (): [AppRoute, (routeArgs: RouterOnChangeArgs) => void] => {
	const currentRoute = getCurrentRoute();
	const [route, setRoute] = useState<AppRoute>(currentRoute.value);

	useSignalEffect(() => {
		const r = currentRoute.value;
		setRoute(r);
	});

	return [route, updateRoute];
};

// useRoute: returns the current route when it is valid for the RoutePath. otherwise, retruns undefined.
// This is helpful, but it isn't perfect. Reflecting the type system has a 👣🔫 footgun 👣🔫 and is not totally safe (the return value is cast).
// Users - Be sure that the arg p that is passed is compatible with R that is returned.
export const useRoute = <R extends AppRoute>(p: RoutePath): R | undefined => {
	const [route] = useCurrentRoute();

	if (route.path === p) {
		return route as R;
	}

	return undefined;
};
