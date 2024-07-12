import { useSignal } from '@preact/signals';
import { Ref } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export const useBoundingRect = <T extends HTMLElement>(): [Ref<T>, DOMRect, DOMRect] => {
	const ref = useRef<T>(null);
	const rect = useSignal<DOMRect>(new DOMRect());

	useEffect(() => {
		const updateRect = () => {
			if (ref.current) {
				rect.value = ref.current.getBoundingClientRect();
			}
		};

		updateRect();
		window.addEventListener('resize', updateRect);

		return () => {
			window.removeEventListener('resize', updateRect);
		};
	}, []);

	return [ref, rect.value, document.body.getBoundingClientRect()];
};

// useCancelEffect: combines useEscapeEffect, useDocumentClick
export const useCancelEffect = (onCancel: () => void) => {
	useDocumentClickEffect(onCancel);
	useEscapeEffect(onCancel);
};

// useEscapeEffect: run a fn when the escape is presssed. Helpful for cancelling hovers.
export const useEscapeEffect = (onEscape: () => void) => {
	useEffect(() => {
		const keyfn = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onEscape();
			}
		};
		document.addEventListener('keyup', keyfn, false);

		return () => {
			document.removeEventListener('keyup', keyfn, false);
		};
	}, []);
};

// useDocumentClick: run a fn when the document is clicked.
// e.stopPropagation can be used to prevent this from firing for specific element.
export const useDocumentClickEffect = (callback: (e: MouseEvent) => void) => {
	useEffect(() => {
		document.addEventListener('click', callback, false);
		return () => document.removeEventListener('click', callback, false);
	}, []);
};
