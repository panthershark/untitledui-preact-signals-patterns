import { expect, test } from 'vitest';
import { enumKeys, enumLabel, enumValue } from './enum';

test('enumKeys', () => {
	enum TestEnum {
		Woah = 'woah',
		Eeek = 3,
		oof
	}
	const got = enumKeys(TestEnum);
	expect(got).toEqual(['Woah', 'Eeek', 'oof']);
});

test('enumValue', () => {
	enum TestEnum {
		Woah = 'woah',
		Eeek = 3,
		oof
	}
	const got = enumValue(TestEnum, 'Eeek');
	expect(got).toEqual(3);
});


test('enumLabel', () => {
	enum TestEnum {
		Woah = 'woah',
		Eeek = 3,
		oof
	}
	const got = enumLabel(TestEnum, 3);
	expect(got).toEqual('Eeek');
});
