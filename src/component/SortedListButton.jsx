import { useContext } from 'react';
import { AppContext } from '../assets/context';

export const SortedListButton = () => {
	const { sortTasks, isSorted } = useContext(AppContext);

	return (
		<button className={isSorted ? 'sort active' : 'sort'} onClick={sortTasks}>
			Сортировка А-Я
		</button>
	);
};
