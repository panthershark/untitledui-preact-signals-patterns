import { signal } from '@preact/signals';
import { fireEvent, render, screen } from '@testing-library/preact';
import { createRef } from 'preact';
import { describe, expect, it, vi } from 'vitest';
import { HoverMenu } from './menu';

const mocks = vi.hoisted(() => ({
	useBoundingRect: vi.fn()
}));

vi.mock('../../hooks/dom', async () => {
	const mod = await vi.importActual<typeof import('../../hooks/dom')>('../../hooks/dom');
	return {
		...mod,
		useBoundingRect: mocks.useBoundingRect
	};
});

describe('<HoverMenu> - renders', () => {
	it('renders correctly collapsed submenu', () => {
		const position = signal({ x: 100, y: 200 });

		mocks.useBoundingRect.mockReturnValue([createRef(), { x: 100, y: 200 }, { x: 0, y: 0, width: 100, height: 100 }]);

		render(
			<HoverMenu
				position={position}
				items={[
					{ label: 'Homer', action: 420 },
					{ label: 'Bart', action: 421 }
				]}
				onAction={vi.fn()}
			/>
		);
		const got = screen.getByRole('menu');

		expect(got?.getAttribute('style')).toEqual('left: 100px; top: 200px;');
		expect(() => screen.getByText('Homer')).not.toThrow();
		expect(() => screen.getByText('Bart')).not.toThrow();
	});
});

describe('<HoverMenu> - action click triggers onSelect', () => {
	const tests = [
		{
			target: 'Homer',
			want: 420
		},
		{
			target: 'Bart',
			want: 421
		}
	];

	tests.forEach((t) => {
		it('fires onSelect', () => {
			const onSelect = vi.fn();

			mocks.useBoundingRect.mockReturnValue([createRef(), { x: 0, y: 0 }, { x: 0, y: 0, width: 100, height: 100 }]);

			render(
				<HoverMenu
					position={signal({ x: 0, y: 0 })}
					items={[
						{ label: 'Homer', action: 420 },
						{ label: 'Bart', action: 421 }
					]}
					onAction={onSelect}
				/>
			);

			fireEvent.click(screen.getByText(t.target));

			if (t.want) {
				expect(onSelect).toHaveBeenCalledTimes(1);
				expect(onSelect).toHaveBeenCalledWith(t.want);
			} else {
				expect(onSelect).not.toHaveBeenCalled();
			}
		});
	});
});
