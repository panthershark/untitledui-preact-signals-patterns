import { Signal } from '@preact/signals';
import classNames from 'classnames';
import { forwardRef } from 'preact/compat';
import { snakeCase } from 'snake-case';
import styles from './text-input.module.scss';

export enum InputWidth {
	Auto = 0,
	Full
}

export enum InputType {
	Text = 'text',
	Password = 'password'
}

export interface InputArgs {
	title?: string;
	textValue: Signal<string>;
	width?: InputWidth;
	type?: InputType;
	disabled?: boolean;
	autoComplete?: string;
	placeholder?: string;
	onChange?: (s: string) => void;
	onBlur?: () => void;
	onFocus?: (e: Event) => void;
}

export const TextInput = forwardRef<HTMLInputElement, InputArgs>(
	(
		{
			title,
			width = InputWidth.Full,
			textValue,
			type = InputType.Text,
			placeholder = '',
			autoComplete,
			onChange,
			onBlur,
			onFocus,
			disabled = false
		},
		ref
	) => (
		<div
			class={classNames(styles.textInput, {
				[styles.fullWidth]: width === InputWidth.Full
			})}
		>
			{!!title && <label for={snakeCase(title)}>{title}</label>}
			<input
				type={type}
				ref={ref}
				disabled={disabled}
				autoComplete={autoComplete}
				id={title ? snakeCase(title) : ''}
				name={title ? snakeCase(title) : ''}
				placeholder={type === InputType.Password ? '••••••••' : placeholder}
				value={textValue.value}
				onInput={(e) => {
					textValue.value = (e.target as HTMLInputElement).value;
					onChange && onChange(textValue.value);
				}}
				onBlur={onBlur}
				onFocus={onFocus}
				role="textbox"
			></input>
		</div>
	)
);
