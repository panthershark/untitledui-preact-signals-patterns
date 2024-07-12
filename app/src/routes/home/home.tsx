import { createFetchApiHook } from '@panthershark/api';
import { batch, useSignal } from '@preact/signals';
import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Button } from '../../ui/button/button';
import { TextInput } from '../../ui/input/text-input';
import { ErrorModal } from '../../ui/modal/err';
import { GlobalProgressBar } from '../../ui/progress/bar';
import styles from './home.module.scss';

const useEchoApi = () =>
	createFetchApiHook<string, string>((req) => {
		return new Promise((resolve) => {
			const delay = Math.random() * 800;

			setTimeout(() => resolve(req), delay);
		});
	}, 'Hello world');

export const Home: FunctionalComponent<{}> = () => {
	const greeting = useSignal<string>('');
	const [op, callEchoApi] = useEchoApi();
	const err = useSignal('');
	const showErrModal = useSignal(false);

	useEffect(() => {
		document.title = 'Home';
	});

	return (
		<>
			<div class={styles.main}>
				<h1 class={styles.hello}>{op.value.resp}</h1>
				<form
					class={styles.form}
					onSubmit={(e) => {
						e.preventDefault();

						if (!greeting.value) {
							batch(() => {
								showErrModal.value = true;
								err.value = 'Greeting cannot be empty';
							});
						} else {
							callEchoApi(greeting.value);
						}
					}}
				>
					<TextInput title="Greeting Text" textValue={greeting} placeholder="Type a new greeting" />

					<Button type="submit">Set Greeting</Button>
				</form>
			</div>
			<GlobalProgressBar op={op.value} />
			<ErrorModal visible={showErrModal} msg={err.value} />
		</>
	);
};
