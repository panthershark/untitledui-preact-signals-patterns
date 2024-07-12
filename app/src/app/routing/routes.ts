import { RouterOnChangeArgs } from 'preact-router';
import { enumKeys } from '../../enum/enum';

export enum RoutePath {
	Loading = '',
	Home = '/',
	Thing = '/thing/:thingID',
	SignIn = '/auth/sign-in',
	SignOut = '/auth/sign-out'
}

export type SignInRoute = { path: RoutePath.SignIn };
export type SignOutRoute = { path: RoutePath.SignOut };
export type HomeRoute = { path: RoutePath.Home };
export type ThingRoute = { path: RoutePath.Thing; thingID: number };
type OtherRoute = { path: RoutePath.Loading };

export type AppRoute = SignInRoute | SignOutRoute | HomeRoute | ThingRoute | OtherRoute;

// const toQuery = (args: Record<string, any>): string => {
//   const q = new URLSearchParams(args);

//   return q.toString();
// };

export const defaultAppRoute = {
	path: RoutePath.Home,
	toUrl: () => RoutePath.Home
};

export const toUrl = (r: AppRoute): string => {
	// as the app grows, this gets filled in with specifics for
	// generating urls
	switch (r.path) {
		case RoutePath.Thing:
			return r.path.replace(':thingID', r.thingID.toString());
		default:
			return r.path;
	}
};

const toRoutePath = (s: string | null): RoutePath | undefined => {
	for (const r of enumKeys(RoutePath)) {
		if (s === RoutePath[r]) {
			return RoutePath[r];
		}
	}

	return undefined;
};

// parseRoute: parses router args into an AppRoute
export const parseRoute = (routeArgs: RouterOnChangeArgs): AppRoute => {
	const normalized = toRoutePath(routeArgs.path);
	// uncomment this when query params are used.
	// const queryParams = new URL(route.url, "http://dont.care").searchParams

	switch (normalized) {
		case RoutePath.Home:
		case RoutePath.SignIn:
		case RoutePath.SignOut:
		case RoutePath.Thing:
			const thingID = Number(routeArgs.matches?.thingID);
			if (!isNaN(thingID)) {
				return { path: RoutePath.Thing, thingID };
			}

			break;
	}

	return { path: RoutePath.Loading };
};
