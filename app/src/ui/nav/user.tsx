import { batch, useSignal } from '@preact/signals';
import { FunctionalComponent, JSX } from 'preact';
import { route } from 'preact-router';
import { RoutePath, toUrl } from '../../app/routing/routes';
import { Authenticated } from '../../app/state';
import { useBoundingRect, useCancelEffect } from '../../hooks/dom';
import * as Menu from '../../ui/hover-menu/menu';
import styles from './nav.module.scss';

interface Args {
	user: Authenticated;
}

const avatarPhoto = (photoUrl: string): JSX.CSSProperties => {
	return photoUrl ? { background: `url(${photoUrl})`, backgroundSize: 'cover' } : {};
};

export const UserIcon: FunctionalComponent<Args> = ({ user }) => {
	const [ref, rect] = useBoundingRect<HTMLDivElement>();
	const isOpen = useSignal(false);
	const pos = useSignal<Menu.Position>({ x: 0, y: 0 });

	useCancelEffect(() => {
		isOpen.value = false;
	});

	return (
		<>
			<div
				ref={ref}
				class={styles.avatar}
				style={avatarPhoto(user.photoURL)}
				onClick={(e) => {
					e.stopPropagation();
					batch(() => {
						pos.value = { x: rect.left, y: rect.bottom + 16 };
						isOpen.value = !isOpen.value;
					});
				}}
			>
				{user.photoURL ? '' : user.name.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
			</div>
			{isOpen.value && (
				<Menu.HoverMenu
					title="User Menu"
					items={[
						{
							label: 'Sign Out',
							action: toUrl({ path: RoutePath.SignOut })
						}
					]}
					position={pos}
					onAction={(url) => route(url)}
				/>
			)}
		</>
	);
};
