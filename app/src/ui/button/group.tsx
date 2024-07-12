import { FunctionalComponent } from 'preact';
import styles from './group.module.scss';

export const ButtonGroup: FunctionalComponent<{}> = ({ children }) => {
	return <div class={styles.group}>{children}</div>;
};
