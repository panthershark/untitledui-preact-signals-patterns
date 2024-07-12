import { MoonIcon, SunIcon } from '@panthershark/icons';
import { batch, useSignal } from '@preact/signals';
import { FunctionalComponent } from 'preact';
import { ColorScheme, systemColorScheme, useColorScheme } from '../../hooks/color-scheme';
import { useBoundingRect, useCancelEffect } from '../../hooks/dom';
import * as Menu from '../hover-menu/menu';
import { IconButton, IconButtonSize, IconButtonStyle } from './icon-button';
import styles from './theme.module.scss';

export const ThemeButton: FunctionalComponent<{}> = ({}) => {
	const colorScheme = useColorScheme();
	const [ref, rect] = useBoundingRect<HTMLButtonElement>();
	const isOpen = useSignal(false);
	const pos = useSignal<Menu.Position>({ x: 0, y: 0 });

	useCancelEffect(() => {
		isOpen.value = false;
	});

	return (
		<>
			<IconButton
				ref={ref}
				style={IconButtonStyle.TertiaryGray}
				size={IconButtonSize.Small}
				onClick={(e) => {
					e.stopPropagation();
					batch(() => {
						pos.value = { x: rect.left, y: rect.bottom + 16 };
						isOpen.value = !isOpen.value;
					});
				}}
			>
				{colorScheme.value === ColorScheme.Light ? (
					<SunIcon class={styles.themeBtn} />
				) : (
					<MoonIcon class={styles.themeBtn} />
				)}
			</IconButton>
			{isOpen.value && (
				<Menu.HoverMenu
					title="Color "
					items={[
						{ label: 'System Default', action: systemColorScheme() },
						{ label: 'Light', action: ColorScheme.Light },
						{ label: 'Dark', action: ColorScheme.Dark }
					]}
					position={pos}
					onAction={(s) => {
						colorScheme.value = s;
						isOpen.value = false;
					}}
				/>
			)}
		</>
	);
};
