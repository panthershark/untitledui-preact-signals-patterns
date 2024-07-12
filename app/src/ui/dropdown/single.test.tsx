import { signal } from '@preact/signals';
import { fireEvent, render, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown, DropdownState, Option } from './single';

describe('Dropdown render and effects', () => {
	type TestOption = {
		bleep: string;
		blorg: number;
	};

	const options: Option<TestOption>[] = Array.from(Array(5), (_, i) => ({
		label: `item ${i}`,
		value: { bleep: `bleep ${i}`, blorg: i }
	}));
	const tests = [
		{
			name: 'collapsed',
			args: {
				title: 'Bleep Blop Blorg',
				options,
				placeholder: 'Pick an Option',
				selectedValue: undefined,
				expanded: false
			},
			want: {
				dropdown: {
					name: 'bleep_blop_blorg',
					currentValue: 'Pick an Option',
					selectedIdx: undefined,
					optionsVisible: false
				}
			}
		},
		{
			name: 'collapsed with selected value',
			args: {
				title: 'Bleep Blop Blorg',
				options,
				placeholder: 'Pick an Option',
				selectedValue: options[3].value,
				expanded: false
			},
			want: {
				dropdown: {
					name: 'bleep_blop_blorg',
					currentValue: options[3].label,
					selectedIdx: 3,
					optionsVisible: false
				}
			}
		},
		{
			name: 'expanded',
			args: {
				title: 'Bleep Blop Blorg',
				options,
				placeholder: 'Pick an Option',
				selectedValue: undefined,
				expanded: true
			},
			want: {
				dropdown: {
					name: 'bleep_blop_blorg',
					currentValue: 'Pick an Option',
					selectedIdx: undefined,
					optionsVisible: true
				}
			}
		},
		{
			name: 'expanded with selected value',
			args: {
				title: 'Bleep Blop Blorg',
				options,
				placeholder: 'Pick an Option',
				selectedValue: options[1].value,
				expanded: true
			},
			want: {
				dropdown: {
					name: 'bleep_blop_blorg',
					currentValue: options[1].label,
					selectedIdx: 1,
					optionsVisible: true
				}
			}
		}
	];

	tests.forEach((t) => {
		it(`renders correctly,  ${t.name}`, () => {
			const state = signal(t.args);
			const { container } = render(<Dropdown state={state} />);

			const gotLabel = container.getElementsByTagName('label').item(0);
			const gotValue = container.getElementsByClassName('value').item(0);
			const gotList = container.getElementsByTagName('ul').item(0);

			expect(gotLabel).not.toBeNull();

			expect(gotValue).not.toBeNull();
			expect(gotValue?.textContent).toEqual(t.want.dropdown.currentValue);

			if (t.want.dropdown.optionsVisible) {
				expect(gotList).not.toBeNull();

				t.args.options.forEach((opt, i) => {
					const li = gotList?.children.item(i);
					expect(li).not.toBeNull();
					expect(li?.textContent).toEqual(opt.label);
					expect(li?.classList.contains('selected')).toEqual(i === t.want.dropdown.selectedIdx);
				});
			} else {
				expect(gotList).toBeNull();
			}
		});

		if (t.args.expanded) {
			it(`updates the value, ${t.name}`, async () => {
				const testIdx = 2;
				const want = t.args.options[testIdx].value;
				const onChange = vi.fn();
				const state = signal(t.args);

				const { container } = render(<Dropdown state={state} onChange={onChange} />);
				const gotList = container.getElementsByTagName('ul').item(0);

				expect(gotList).not.toBeNull();

				const li = gotList?.children.item(testIdx);
				if (li) {
					fireEvent.click(li);
				} else {
					expect(li).not.toBeNull();
				}

				await waitFor(() => {
					expect(state.value.selectedValue).toEqual(want);
					expect(container.getElementsByTagName('ul').length).toEqual(0);
					expect(onChange).toHaveBeenCalledTimes(1);
				});
			});
		}
	});

	it(`hides items on escape`, async () => {
		const state = signal<DropdownState<any>>({
			title: 'whatever',
			options,
			placeholder: 'who cares',
			expanded: true
		});

		const { container } = render(<Dropdown state={state} />);
		const ev = new KeyboardEvent('keyup', { key: 'Escape' });
		fireEvent(global.document, ev);

		await waitFor(() => {
			expect(container.getElementsByTagName('ul').length).toEqual(0);
		});
	});
});
