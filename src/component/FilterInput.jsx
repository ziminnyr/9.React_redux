import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { selectOriginalTodos } from '../selectors/selectors';
import { SET_TODO_LIST } from '../constants';

export const FilterInput = () => {
	const dispatch = useDispatch();
	const originalTodos = useSelector(selectOriginalTodos);

	const filterTasks = (searchStr) => {
		if (!searchStr) {
			dispatch({ type: SET_TODO_LIST, payload: [...originalTodos] });
			return;
		}
		const listOfTodos = [...originalTodos];
		const filteredTodos = listOfTodos.filter((task) => task.title.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
		console.log('filteredTodos', filteredTodos);

		dispatch({ type: SET_TODO_LIST, payload: filteredTodos });
	};

	return <input className="search-input" type="text" onChange={debounce((e) => filterTasks(e.target.value), 500)}></input>;
};
