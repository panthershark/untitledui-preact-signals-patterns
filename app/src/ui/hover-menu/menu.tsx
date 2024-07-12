import { Signal, batch, useSignal } from '@preact/signals';
import classNames from 'classnames';
import { useEffect } from 'preact/hooks';
import { useBoundingRect } from '../../hooks/dom';
import styles from './menu.module.scss';

export type MenuItem<A> = {
	label: string;
	action: A;
};

export interface Position {
	x: number;
	y: number;
}

export interface Args<A> {
	title?: string;
	position: Signal<Position>;
	items: MenuItem<A>[];
	onAction: (action: A) => void;
}

export const HoverMenu = <A,>({ title = '', position, items, onAction }: Args<A>) => {
	const [menuRef, menuRect, bodyRect] = useBoundingRect<HTMLDivElement>();
	const visible = useSignal(false);
	const highlightedIdx = useSignal<number>(0);

	useEffect(() => {
		const diff = bodyRect.width - position.value.x - menuRect.width;

		batch(() => {
			if (diff < 0) {
				position.value = { ...position.value, x: position.value.x + diff - 16 };
			}

			visible.value = true;
		});
	}, [menuRect, position.value.x]);

	useEffect(() => {
		const keyFn = (e: KeyboardEvent) => {
			e.preventDefault();
			let idx = highlightedIdx.value;

			switch (e.key) {
				case 'ArrowDown':
					idx++;
					break;
				case 'ArrowUp':
					idx--;
					break;
				case 'Enter':
					onAction(items[idx].action);
					break;
			}

			if (idx >= items.length) {
				highlightedIdx.value = items.length - 1;
			} else if (idx < 0) {
				highlightedIdx.value = 0;
			} else if (idx !== highlightedIdx.value) {
				highlightedIdx.value = idx;
			}
		};
		document.addEventListener('keydown', keyFn);

		return () => document.removeEventListener('keydown', keyFn);
	});

	return (
		<div
			ref={menuRef}
			role="menu"
			class={classNames([styles.menu, { [styles.visible]: visible.value }])}
			style={{ left: position.value.x, top: position.value.y }}
			title={`${title} Menu`}
		>
			<ul class={styles.list}>
				{items.map((m, i) => (
					<li
						key={m.label}
						role="menuitem"
						class={classNames(styles.listItem, { [styles.highlighted]: i === highlightedIdx.value })}
						onClick={(e: Event) => {
							e.stopPropagation();
							onAction(m.action);
						}}
					>
						<div class={styles.item} title={m.label}>
							{m.label}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
