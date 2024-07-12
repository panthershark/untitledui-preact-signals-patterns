import { InfoIcon } from '@panthershark/icons';
import { Signal } from '@preact/signals';
import { FunctionalComponent } from 'preact';
import { Button } from '../button/button';
import styles from './err.module.scss';
import { Modal, ModalIconColor } from './modal';

interface Args {
	msg?: string;
	visible: Signal<boolean>;
}

export const ErrorModal: FunctionalComponent<Args> = ({ visible, msg }) => {
	return (
		<Modal visible={visible} iconColor={ModalIconColor.Error} icon={<InfoIcon />}>
			<div class={styles.err}>
				<div class={styles.title}>
					<h2>{msg}</h2>
					<p>Please fix the issue and try again.</p>
				</div>
				<div class={styles.cta}>
					<Button
						onClick={() => {
							visible.value = false;
						}}
					>
						Ok
					</Button>
				</div>
			</div>
		</Modal>
	);
};
