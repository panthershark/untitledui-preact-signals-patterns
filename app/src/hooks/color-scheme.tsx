import { signal, useSignalEffect } from '@preact/signals';
import { useEffect } from 'preact/hooks';

export enum ColorScheme {
	Light = 'light',
	Dark = 'dark'
}

export const systemColorScheme = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return ColorScheme.Dark;
	}

	return ColorScheme.Light;
};

const defaultColorScheme = () => {
	const saved = localStorage.getItem('colorScheme');

	switch (saved) {
		case ColorScheme.Dark:
		case ColorScheme.Light:
			return saved;
		default:
			return systemColorScheme();
	}
};

const scheme = signal<ColorScheme>(defaultColorScheme());

export const useColorScheme = () => {
	useSignalEffect(() => {
		localStorage.setItem('colorScheme', scheme.value);
	});

	useEffect(() => {
		const fn = (e: MediaQueryListEvent) => {
			scheme.value = e.matches ? ColorScheme.Dark : ColorScheme.Light;
		};

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);

		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
		};
	}, []);

	return scheme;
};
