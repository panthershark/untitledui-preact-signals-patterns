import { CheckIcon } from '@panthershark/icons';
import { Signal } from '@preact/signals';
import classNames from 'classnames';
import { FunctionalComponent } from 'preact';
import styles from './check.module.scss';

export interface Args {
	checked: Signal<boolean>;
	disabled?: boolean;
	onChange?: () => void;
}

export const Checkbox: FunctionalComponent<Args> = ({ checked, children, disabled = false, onChange }) => {
	return (
		<div
			class={styles.checkbox}
			onClick={() => {
				checked.value = !checked.value;
				onChange && onChange();
			}}
		>
			<div
				aria-checked={checked.value}
				tabIndex={0}
				role="checkbox"
				onKeyDown={(e) => {
					if (e.key === ' ') {
						checked.value = !checked.value;
						onChange && onChange();
					}
				}}
				class={classNames(styles.btn, { [styles.checked]: checked.value, [styles.disabled]: disabled })}
			>
				{checked.value && <CheckIcon class={styles.icon} />}
				{children}
			</div>
		</div>
	);
};
