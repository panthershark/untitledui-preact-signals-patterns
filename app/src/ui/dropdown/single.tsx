import { Signal, useComputed } from '@preact/signals';
import classNames from 'classnames';
import { h } from 'preact';
import { useBoundingRect, useCancelEffect } from '../../hooks/dom';
import styles from './single.module.scss';

export interface Option<T> {
	label: string | h.JSX.Element;
	value: T;
}

export interface DropdownState<T> {
	title: string;
	selectedValue?: T;
	options: Option<T>[];
	placeholder?: string;
	disabled?: boolean;
	expanded?: boolean;
}

interface Args<T> {
	state: Signal<DropdownState<T>>;
	onChange?: (v: T) => void;
}

export const Dropdown = <T,>({ state, onChange }: Args<T>) => {
	const { title, placeholder, options, disabled, expanded, selectedValue } = useComputed(() => {
		return {
			disabled: false,
			expanded: false,
			placeholder: '',
			...state.value
		};
	}).value;
	const [refDropDown, ddlRect] = useBoundingRect<HTMLDivElement>();
	const selected = options.find((opt) => opt.value === selectedValue);

	useCancelEffect(() => {
		state.value = { ...state.value, expanded: false };
	});

	return (
		<div ref={refDropDown} class={styles.ddl}>
			<label>{title}</label>
			<div class={styles.ddl_select}>
				<div
					class={classNames(styles.select, {
						[styles.expanded]: expanded,
						[styles.disabled]: disabled
					})}
					onClick={(e) => {
						e.stopPropagation();
						if (!disabled) {
							state.value = { ...state.value, expanded: !expanded };
						}
					}}
				>
					<span class={styles.value}>{selected ? selected.label : placeholder}</span>
				</div>
				<div
					class={classNames(styles.list, {
						[styles.hidden]: !expanded
					})}
					style={{
						left: `${ddlRect.left}px`,
						top: `${ddlRect.bottom}px`,
						width: `${ddlRect.width}px`,
						maxHeight: expanded ? `calc(100vh - ${ddlRect.bottom}px + 1rem)` : '0'
					}}
				>
					<ul>
						{options.map((opt) => (
							<li
								class={classNames(styles.listItem, {
									[styles.selected]: opt.value === selectedValue
								})}
								onClick={(e) => {
									e.stopPropagation();
									state.value = {
										...state.value,
										selectedValue: opt.value,
										expanded: false
									};

									if (onChange) {
										onChange(opt.value);
									}
								}}
							>
								{opt.label}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
