import { FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { authn } from '../../app/auth';
import { RoutePath, toUrl } from '../../app/routing/routes';
import styles from './auth.module.scss';

export const SignOut: FunctionalComponent<{}> = () => {
	useEffect(() => {
		authn.signOut();
	}, []);

	return (
		<div class={styles.main}>
			<div class={styles.wrap}>
				<div class={styles.auth}>
					<div class={styles.auth_wrap}>
						<Link href={toUrl({ path: RoutePath.Home })}>
							<img class={styles.logo} src="/logo.gif" alt="Logo" />
						</Link>
						<h1>Sign Out</h1>
						<p>You've been signed out.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
