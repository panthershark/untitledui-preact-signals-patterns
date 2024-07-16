import { FunctionalComponent } from 'preact';
import styles from './empty.module.scss';

interface Args {
	title: string;
	description: string;
}

// EmptyState: common usage <EmptyState title="I'm empty" description="nothing here"><button>Add</button></EmptyState>
export const EmptyState: FunctionalComponent<Args> = ({ title, description, children }) => {
	return (
		<div class={styles.empty}>
			<div class={styles.emptyWrap}>
				<h2 class={styles.title}>{title}</h2>
				<p>{description}</p>
				{children}
			</div>
		</div>
	);
};
