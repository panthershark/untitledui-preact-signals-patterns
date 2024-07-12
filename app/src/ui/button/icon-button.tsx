import classNames from 'classnames';
import { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import styles from './icon-button.module.scss';

export enum IconButtonStyle {
	Primary = 'primary',
	TertiaryGray = 'tertiaryGray',
	Plain = 'plain'
}

export enum IconButtonSize {
	Small = 'sm',
	Medium = 'md',
	Large = 'lg'
}

export interface Args {
	style?: IconButtonStyle;
	size?: IconButtonSize;
	disabled?: boolean;
	onClick?: (e: MouseEvent) => void;
}

type Attrs = Pick<JSX.HTMLAttributes<HTMLButtonElement>, 'children' | 'class'>;

export const IconButton = forwardRef<HTMLButtonElement, Args & Attrs>(
	(
		{
			class: className,
			size = IconButtonSize.Medium,
			style = IconButtonStyle.TertiaryGray,
			children,
			disabled = false,
			onClick
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				type="button"
				class={classNames(styles.button, styles[size], styles[style], { [styles.disabled]: disabled }, className)}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
);
