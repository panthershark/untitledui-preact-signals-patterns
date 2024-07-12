import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { RoutePath, ThingRoute } from '../../app/routing/routes';
import { useRoute } from '../../hooks/routes';
import styles from './thing.module.scss';

export const Thing: FunctionalComponent<{}> = () => {
	const route = useRoute<ThingRoute>(RoutePath.Thing);

	useEffect(() => {
		document.title = `Thing ${route?.thingID}`;
	}, [route?.thingID]);

	return (
		<>
			<div class={styles.main}>TODO: implement something here.</div>
		</>
	);
};
