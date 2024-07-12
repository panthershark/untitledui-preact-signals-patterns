import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

export const Redirect: FunctionalComponent<{ href: string }> = ({ href }) => {
	useEffect(() => {
		window.location.href = href;
	}, []);
	return null;
};
