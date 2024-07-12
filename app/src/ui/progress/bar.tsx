import { FetchOperation, FetchOperationStatus } from '@panthershark/api';
import { Signal, useSignal } from '@preact/signals';
import classNames from 'classnames';
import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import styles from './bar.module.scss';

enum ProgressStatus {
	Hidden,
	Running,
	Success,
	Error
}

const updateFreq = 200; // 200ms update frequency

interface ProgressState {
	timeout?: NodeJS.Timeout;
	status: ProgressStatus;
	completionPercent: number; // number between 0 and 1 indicating how much is complete
	target: number;
	hold: number;
}

interface ProgressConfig {
	target?: number; // number of milliseconds operation expects to take. used to calculate progress. default is 3000ms
	hold?: number; // how long to hold at 100% to show completion.  default is 1200ms
}

type StartFn = (config?: ProgressConfig) => void;
type EndFn = (isErr?: boolean) => void;

const updateProgress = (s: Signal<ProgressState>) => {
	clearTimeout(s.value.timeout);
	const elapsed = s.value.target * s.value.completionPercent + updateFreq;
	const nextPerc = elapsed / s.value.target;

	s.value = {
		...s.value,
		status: ProgressStatus.Running,
		completionPercent: nextPerc > 1 ? 1 : nextPerc,
		timeout: setTimeout(() => updateProgress(s), updateFreq)
	};
};

const useProgress = (init?: ProgressConfig): [ProgressState, StartFn, EndFn] => {
	const state = useSignal<ProgressState>({
		status: ProgressStatus.Hidden,
		completionPercent: 0.05,
		target: init?.target || 3000,
		hold: init?.hold || 1200
	});

	const start: StartFn = (c) => {
		clearTimeout(state.value.timeout);

		state.value = {
			...state,
			status: ProgressStatus.Running,
			completionPercent: 0,
			target: c?.target || state.value.target,
			hold: c?.hold || state.value.hold,
			timeout: setTimeout(() => updateProgress(state), updateFreq)
		};
	};
	const end: EndFn = (showErr = false) => {
		clearTimeout(state.value.timeout);
		const t = setTimeout(() => {
			state.value = { ...state.value, status: ProgressStatus.Hidden, completionPercent: 1 };
		}, state.value.hold);

		state.value = {
			...state.value,
			status: showErr ? ProgressStatus.Error : ProgressStatus.Success,
			completionPercent: 1,
			timeout: t
		};
	};

	return [state.value, start, end];
};

export const useProgressBar = (op: FetchOperation<any, any>, init?: ProgressConfig): ProgressState => {
	const [state, start, end] = useProgress(init);

	useEffect(() => {
		switch (op.status) {
			case FetchOperationStatus.Fetching:
				start();
				break;
			case FetchOperationStatus.Error:
				end(true);
				break;
			case FetchOperationStatus.Success:
				end(false);
				break;
			case FetchOperationStatus.Initialized:
				break;
		}
	}, [op.status]);

	return state;
};

export const GlobalProgressBar: FunctionalComponent<{ op: FetchOperation<any, any>; init?: ProgressConfig }> = ({
	op,
	init
}) => {
	const prog = useProgressBar(op, init);

	return (
		<div class={styles.topbar}>
			<div
				class={classNames(styles.progress, {
					[styles.hidden]: prog.status === ProgressStatus.Hidden,
					[styles.err]: prog.status === ProgressStatus.Error
				})}
				style={{ width: `${(prog.completionPercent * 100).toFixed(0)}%` }}
			></div>
		</div>
	);
};

export const InlineProgressBar: FunctionalComponent<{ op: FetchOperation<any, any>; init?: ProgressConfig }> = ({
	op,
	init
}) => {
	const prog = useProgressBar(op, init);

	return (
		<div class={styles.progbar}>
			<div class={styles.progbarProgress}>
				<div class={styles.progbarInner} style={{ width: `${prog.completionPercent * 100}%` }}></div>
			</div>
			<div class={styles.progbarText}>{(prog.completionPercent * 100).toFixed(0)}%</div>
		</div>
	);
};
