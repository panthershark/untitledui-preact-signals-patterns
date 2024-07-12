import { FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { RoutePath, toUrl } from '../../app/routing/routes';
import { UserType } from '../../app/state';
import { useAppUser } from '../../hooks/user';
import { ThemeButton } from '../button/theme';
import styles from './nav.module.scss';
import { UserIcon } from './user';

export const Nav: FunctionalComponent<{}> = () => {
	const user = useAppUser();

	if (user.userType === UserType.Authenticated) {
		return (
			<>
				<nav class={styles.topnav}>
					<div class={styles.left}>
						<Link href={toUrl({ path: RoutePath.Home })}>
							<div class={styles.company}>
								<img class={styles.logo} src="/logo.svg" alt="Logo" />
								<div class={styles.name}>UI Patterns</div>
							</div>
						</Link>
						<div class={styles.menuItems}>
							<Link href={toUrl({ path: RoutePath.Thing, thingID: 1 })}>Thing 1</Link>
							<Link href={toUrl({ path: RoutePath.Thing, thingID: 2 })}>Thing 2</Link>
						</div>
					</div>
					<div class={styles.right}>
						<ThemeButton />
						<UserIcon user={user} />
					</div>
				</nav>
				<nav class={styles.sidenav}></nav>
			</>
		);
	}

	return null;
};
