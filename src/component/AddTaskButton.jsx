import { useDispatch, useSelector } from 'react-redux';
import { TODO_LIST } from '../assets/assets.env';
import { selectInProcess } from '../selectors/selectors';
import { NEED_RELOAD, SET_IN_PROCESS } from '../constants';

export const AddTaskButton = () => {
	const dispatch = useDispatch();
	const inProcess = useSelector(selectInProcess);

	const onAddTask = () => {
		const taskName = prompt('Введите наименование задачи');

		if (!taskName) {
			console.log('Задача не добавлена');
			return;
		}

		dispatch({ type: SET_IN_PROCESS, payload: true });
		fetch(TODO_LIST, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: taskName,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача добавлена', response);
				dispatch({ type: NEED_RELOAD });
			})
			.catch((error) => console.log('Ошибка добавления данных:', error))
			.finally(() => dispatch({ type: SET_IN_PROCESS, payload: false }));
	};

	return (
		<button className="add-button" onClick={onAddTask} disabled={inProcess}>
			Добавить задание
		</button>
	);
};
