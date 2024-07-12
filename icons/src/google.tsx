import { JSX, forwardRef } from 'preact/compat';
export default forwardRef<SVGSVGElement, JSX.SVGAttributes<SVGSVGElement> & JSX.HTMLAttributes<EventTarget>>(
	(props, ref) => (
		<svg
			class={props.class}
			style={props.style}
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
		>
			<path
				d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
				fill="#4285F4"
			/>
			<path
				d="M16.2853 30C20.1424 30 23.3804 28.7555 25.7456 26.6089L21.2377 23.1865C20.0313 24.011 18.4123 24.5866 16.2853 24.5866C12.5076 24.5866 9.30128 22.1444 8.15832 18.7688L7.99078 18.7827L3.58111 22.1272L3.52344 22.2843C5.87261 26.8577 10.698 30 16.2853 30Z"
				fill="#34A853"
			/>
			<path
				d="M8.16061 18.7688C7.85903 17.8977 7.6845 16.9643 7.6845 15.9999C7.6845 15.0354 7.85903 14.1021 8.14475 13.231L8.13676 13.0455L3.67181 9.64734L3.52572 9.71544C2.55751 11.6132 2.00195 13.7444 2.00195 15.9999C2.00195 18.2555 2.55751 20.3865 3.52572 22.2843L8.16061 18.7688Z"
				fill="#FBBC05"
			/>
			<path
				d="M16.2854 7.4133C18.9679 7.4133 20.7774 8.54885 21.8092 9.4978L25.8409 5.64C23.3648 3.38445 20.1425 2 16.2854 2C10.698 2 5.87262 5.1422 3.52344 9.71549L8.14247 13.2311C9.30131 9.85555 12.5076 7.4133 16.2854 7.4133Z"
				fill="#EB4335"
			/>
		</svg>
	)
);