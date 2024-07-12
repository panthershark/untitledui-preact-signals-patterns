import { CloseIcon } from '@panthershark/icons';
import { Signal, useSignalEffect } from '@preact/signals';
import classNames from 'classnames';
import { FunctionalComponent, JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { IconButton, IconButtonStyle } from '../button/icon-button';
import styles from './modal.module.scss';

export enum ModalIconColor {
	None = '',
	Brand = 'brand',
	Success = 'success',
	Error = 'error'
}

interface Args {
	visible: Signal<boolean>;
	icon?: JSX.Element;
	iconColor?: ModalIconColor;
}

export const Modal: FunctionalComponent<Args> = ({ visible, icon, iconColor = ModalIconColor.Brand, children }) => {
	const ref = useRef<HTMLDialogElement>(null);

	useSignalEffect(() => {
		if (visible.value && ref.current) {
			ref.current.showModal();
		} else if (ref.current) {
			ref.current.close();
		}
	});

	return (
		<dialog
			ref={ref}
			onClose={() => {
				visible.value = false;
			}}
		>
			{visible.value && (
				<div class={styles.modal}>
					<IconButton
						class={styles.close}
						onClick={() => {
							visible.value = false;
						}}
						style={IconButtonStyle.Plain}
					>
						<CloseIcon />
					</IconButton>
					<div class={classNames(styles.icon, styles[iconColor])}>{icon}</div>
					<div class={styles.wrap}>{children}</div>
				</div>
			)}
		</dialog>
	);
};
