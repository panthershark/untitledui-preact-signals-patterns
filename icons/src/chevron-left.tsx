import { JSX, forwardRef } from 'preact/compat';
export default forwardRef<SVGSVGElement, JSX.SVGAttributes<SVGSVGElement> & JSX.HTMLAttributes<EventTarget>>(
	(props, ref) => (
		<svg
			class={props.class}
			style={props.style}
			ref={ref}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 18L9 12L15 6"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	)
);