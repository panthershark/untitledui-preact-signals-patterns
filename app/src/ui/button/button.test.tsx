import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonStyle, ButtonWidth } from './button';

describe('<Button> - rendering', () => {
	it(`renders children`, () => {
		render(<Button>fqwahgaghads</Button>);
		const got = screen.getByRole('button');

		expect(got.innerText).toEqual('fqwahgaghads');
	});

	it('defaults style to Primary', () => {
		render(<Button />);
		const got = screen.getByRole('button');
		expect(got.className).toContain(ButtonStyle.Primary);
	});

	it('sets style to Primary', () => {
		render(<Button style={ButtonStyle.Primary} />);
		const got = screen.getByRole('button');
		expect(got.className).toContain(ButtonStyle.Primary);
	});

	it('sets style to SecondaryGray', () => {
		render(<Button style={ButtonStyle.SecondaryGray} />);
		const got = screen.getByRole('button');
		expect(got.className).toContain(ButtonStyle.SecondaryGray);
	});

	it('defaults type to button', () => {
		render(<Button />);
		const got = screen.getByRole('button');
		expect(got?.getAttribute('type')).toEqual('button');
	});

	it('sets type button', () => {
		render(<Button type="button" />);
		const got = screen.getByRole('button');
		expect(got?.getAttribute('type')).toEqual('button');
	});

	it('sets type submit', () => {
		render(<Button type="submit" />);
		const got = screen.getByRole('button');
		expect(got?.getAttribute('type')).toEqual('submit');
	});

	it('defaults width to auto', () => {
		render(<Button />);
		const got = screen.getByRole('button');
		expect(got?.classList.contains('auto')).toEqual(true);
	});

	it('sets width to auto', () => {
		render(<Button width={ButtonWidth.Auto} />);
		const got = screen.getByRole('button');
		expect(got?.classList.contains('auto')).toEqual(true);
	});

	it('sets width to full', () => {
		render(<Button width={ButtonWidth.Full} />);
		const got = screen.getByRole('button');
		expect(got?.classList.contains('full')).toEqual(true);
	});
});

describe('<Button> - events', () => {
	it('send onClick when enabled', () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick} />);

		const got = screen.getByRole('button');
		fireEvent.click(got);

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('do not send onClick when disabled', () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick} disabled={true} />);

		const got = screen.getByRole('button');
		fireEvent.click(got);

		expect(onClick).toHaveBeenCalledTimes(0);
	});
});
