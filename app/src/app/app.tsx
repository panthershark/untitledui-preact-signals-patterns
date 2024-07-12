import { useSignalEffect } from '@preact/signals';
import Router from 'preact-router';
import { Suspense } from 'preact/compat';
import { useEffect, useMemo } from 'preact/hooks';
import { useColorScheme } from '../hooks/color-scheme';
import { useCurrentRoute } from '../hooks/routes';
import { useAppUser } from '../hooks/user';
import { SignIn } from '../routes/auth/signin';
import { SignOut } from '../routes/auth/signout';
import Home from '../routes/home';
import Thing from '../routes/thing';
import { ThemeButton } from '../ui/button/theme';
import { Nav } from '../ui/nav/nav';
import styles from './app.module.scss';
import { Redirect } from './routing/redirect';
import { RoutePath } from './routing/routes';
import { UserType } from './state';

export function App() {
	const colorScheme = useColorScheme();
	const fallback = useMemo(() => <div>loading</div>, []);
	const user = useAppUser();
	const [currentRoute, routeChange] = useCurrentRoute();

	// sometimes child components change document level stuff.
	useEffect(() => {
		document.body.scrollTop = 0; // safari
		document.documentElement.scrollTop = 0; // chrome, ff, ie
	}, [currentRoute]);

	useSignalEffect(() => {
		document.body.className = colorScheme.value;
	});

	switch (user.userType) {
		case UserType.Anonymous:
			return (
				<div class={styles.appLayout}>
					<div class={styles.authThemeButton}>
						<ThemeButton />
					</div>
					<Router onChange={routeChange}>
						<SignIn path={RoutePath.SignIn} />
						<SignOut path={RoutePath.SignOut} />
						<Redirect default={true} href={RoutePath.SignIn} />
					</Router>
				</div>
			);
		case UserType.Authenticated:
			return (
				<div class={styles.appLayout}>
					<Nav />

					<Router onChange={routeChange}>
						<Redirect path={RoutePath.SignIn} href={RoutePath.Home} />
						<SignOut path={RoutePath.SignOut} />

						<Suspense path={RoutePath.Home} fallback={fallback}>
							<Home />
						</Suspense>

						<Suspense path={RoutePath.Thing} fallback={fallback}>
							<Thing />
						</Suspense>

						<div default={true}>bad route</div>
					</Router>
				</div>
			);
		case UserType.Loading:
			return (
				<div class={styles.appLayout}>
					<Nav />
				</div>
			);
	}
}
