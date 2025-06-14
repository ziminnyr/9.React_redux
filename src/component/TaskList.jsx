import { useDispatch, useSelector } from 'react-redux';
import { TODO_LIST } from '../assets/assets.env';
import { useEffect } from 'react';
import { selectInProcess, selectNeedReload, selectTodos } from '../selectors/selectors';
import { NEED_RELOAD, SET_IN_PROCESS, SET_ORIGINAL_TODO, SET_TODO_LIST } from '../constants';

export const TaskList = () => {
	const dispatch = useDispatch();
	const inProcess = useSelector(selectInProcess);
	const todos = useSelector(selectTodos);
	const needReload = useSelector(selectNeedReload);

	useEffect(() => {
		fetch(TODO_LIST)
			.then((loadedTodos) => loadedTodos.json())
			.then((tasks) => {
				dispatch({ type: SET_TODO_LIST, payload: tasks });
				dispatch({ type: SET_ORIGINAL_TODO, payload: tasks });
			})
			.catch((error) => console.log('Ошибка загрузки данных:', error));
	}, [needReload]);

	const onUpdateTask = (id, taskName, isDone, ifCheckbox = 0) => {
		const newTaskName = ifCheckbox ? taskName : prompt('Отредактируйте наименование задания', taskName);

		if (!newTaskName) {
			console.log('Задача не обновлена');
			return;
		}

		fetch(TODO_LIST + `/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTaskName,
				completed: isDone,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача обновлена', response);
				dispatch({ type: NEED_RELOAD });
			})
			.catch((error) => console.log('Ошибка обновления данных:', error))
			.finally(() => dispatch({ type: SET_IN_PROCESS, payload: false }));
	};

	const onDeleteTask = (id) => {
		const confirmation = confirm('Подтвердите удаление');

		if (!confirmation) return 0;

		fetch(TODO_LIST + `/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена', response);
				dispatch({ type: NEED_RELOAD });
			})
			.catch((error) => console.log('Ошибка удаления данных:', error))
			.finally(() => dispatch({ type: SET_IN_PROCESS, payload: false }));
	};

	return (
		<ul className="list">
			{todos.map(({ id, title, completed }) => (
				<li className="task" key={id} id={id}>
					<button className="button delete" disabled={inProcess} onClick={() => onDeleteTask(id)}>
						Удалить
					</button>
					&nbsp;
					<button className="button update" disabled={inProcess} onClick={() => onUpdateTask(id, title, completed)}>
						Обновить
					</button>
					&nbsp; &nbsp;
					<input
						type="checkbox"
						defaultChecked={completed}
						title={title}
						onChange={(e) => onUpdateTask(id, title, e.target.checked, true)}
					/>{' '}
					{title}
				</li>
			))}
		</ul>
	);
};
