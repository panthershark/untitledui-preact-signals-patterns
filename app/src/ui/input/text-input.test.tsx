import { signal } from '@preact/signals';
import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { InputType, InputWidth, TextInput } from './text-input';

describe('<TextInput> - render', () => {
	it(`renders defaults`, () => {
		render(<TextInput textValue={signal('woah')} title="The Titttle" />);
		const gotLabel = screen.getByText('The Titttle');
		const gotInput = screen.getByRole('textbox') as HTMLInputElement;

		expect(gotLabel.getAttribute('for')).toEqual('the_titttle');
		expect(gotInput.value).toEqual('woah');
		expect(gotInput.type).toEqual('text');
		expect(gotInput.disabled).toBeFalsy();
		expect(gotInput.name).toEqual('the_titttle');
		expect(gotInput.placeholder).toEqual('');
		expect(gotInput.parentElement?.classList.contains('textInput')).toEqual(true);
		expect(gotInput.parentElement?.classList.contains('fullWidth')).toEqual(true);
	});

	it(`renders defaults for password`, () => {
		render(<TextInput textValue={signal('woah')} title="The Passwd" type={InputType.Password} />);
		const gotLabel = screen.getByText('The Passwd');
		const gotInput = screen.getByRole('textbox') as HTMLInputElement;

		expect(gotLabel.getAttribute('for')).toEqual('the_passwd');
		expect(gotInput.value).toEqual('woah');
		expect(gotInput.type).toEqual('password');
		expect(gotInput.disabled).toBeFalsy();
		expect(gotInput.name).toEqual('the_passwd');
		expect(gotInput.placeholder).toEqual('••••••••');
		expect(gotInput.parentElement?.classList.contains('textInput')).toEqual(true);
		expect(gotInput.parentElement?.classList.contains('fullWidth')).toEqual(true);
	});

	it('sets width Auto', () => {
		render(<TextInput textValue={signal('whatevr')} width={InputWidth.Auto} />);
		const got = screen.getByRole('textbox') as HTMLInputElement;

		expect(got.parentElement?.classList.contains('fullWidth')).toEqual(false);
	});

	it('sets width Full', () => {
		render(<TextInput textValue={signal('whatevr')} width={InputWidth.Full} />);
		const got = screen.getByRole('textbox') as HTMLInputElement;

		expect(got.parentElement?.classList.contains('fullWidth')).toEqual(true);
	});

	it('sets placeholder attribute textbox', () => {
		render(<TextInput textValue={signal('whatevr')} placeholder="place_hoolldddderrr" />);
		const got = screen.getByRole('textbox') as HTMLInputElement;

		expect(got.placeholder).toEqual('place_hoolldddderrr');
	});

	it('ignores placeholder attribute password', () => {
		render(<TextInput textValue={signal('whatevr')} type={InputType.Password} placeholder="nope" />);
		const got = screen.getByRole('textbox') as HTMLInputElement;

		expect(got.placeholder).toEqual('••••••••');
	});

	it('sets disabled attribute', () => {
		render(<TextInput textValue={signal('whatevr')} disabled={true} />);
		const got = screen.getByRole('textbox') as HTMLInputElement;

		expect(got.disabled).toBeTruthy();
	});

	it('sets autoComplete attribute', () => {
		render(<TextInput textValue={signal('whatevr')} autoComplete="off" />);
		const got = screen.getByRole('textbox');

		expect(got.getAttribute('autocomplete')).toEqual('off');
	});
});

describe('<TextInput> - events ', () => {
	it(`triggers onChange`, () => {
		const textValue = signal('a');
		const onChange = vi.fn();

		render(<TextInput textValue={textValue} onChange={onChange} />);
		const el = screen.getByRole('textbox') as HTMLInputElement;

		el.value = 'yo!';
		fireEvent.input(el);

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('yo!');
	});

	it(`triggers onBlur`, () => {
		const onBlur = vi.fn();
		render(<TextInput textValue={signal('whokarz')} onBlur={onBlur} />);
		const el = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.focusOut(el);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	it(`triggers onFocus`, () => {
		const onFocus = vi.fn();
		render(<TextInput textValue={signal('whokarz')} onFocus={onFocus} />);
		const el = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.focusIn(el);
		expect(onFocus).toHaveBeenCalledTimes(1);
	});
});
