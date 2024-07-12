import { FunctionalComponent } from 'preact';
import styles from './button.module.scss';

export enum ButtonWidth {
	Auto = 'auto',
	Full = 'full'
}

export enum ButtonSize {
	ExtraSmall = 'xs',
	Small = 'sm',
	Medium = 'md',
	Large = 'lg',
	ExtraLarge = 'xl'
}

export enum ButtonStyle {
	Primary = 'primary',
	SecondaryGray = 'secondaryGray'
}

export interface ButtonArgs {
	style?: ButtonStyle;
	width?: ButtonWidth;
	size?: ButtonSize;
	disabled?: boolean;
	type?: 'button' | 'submit';
}

interface ButtonEvents {
	onClick?: () => void;
}

export const Button: FunctionalComponent<ButtonArgs & ButtonEvents> = ({
	size = ButtonSize.Medium,
	style = ButtonStyle.Primary,
	width = ButtonWidth.Auto,
	type = 'button',
	disabled = false,
	children,
	onClick
}) => {
	return (
		<button
			class={`${styles[style]} ${styles[size]} ${styles[width]}`}
			type={type}
			onClick={() => onClick && onClick()}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
