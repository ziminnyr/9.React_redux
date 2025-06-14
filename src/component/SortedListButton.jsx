import { useDispatch, useSelector } from 'react-redux';
import { selectIsSorted, selectTodos } from '../selectors/selectors';
import { SET_IS_SORTED, SET_TODO_LIST } from '../constants';

export const SortedListButton = () => {
	const dispatch = useDispatch();
	const isSorted = useSelector(selectIsSorted);
	const todos = useSelector(selectTodos);

	//сортировка заданий из БД
	const sortTasks = () => {
		const sortedTodos = isSorted ? [...todos].sort((a, b) => a.id - b.id) : [...todos].sort((a, b) => a.title.localeCompare(b.title));
		dispatch({ type: SET_TODO_LIST, payload: sortedTodos });
		dispatch({ type: SET_IS_SORTED, payload: !isSorted });
	};

	return (
		<button className={isSorted ? 'sort active' : 'sort'} onClick={sortTasks}>
			Сортировка А-Я
		</button>
	);
};
