import { useContext } from 'react';
import { TODO_LIST } from '../assets/assets.env';
import { AppContext } from '../assets/context';

export const AddTaskButton = () => {
	const { inProcess, setInProcess, makeRefresh } = useContext(AppContext);

	const onAddTask = () => {
		const taskName = prompt('Введите наименование задачи');

		if (!taskName) {
			console.log('Задача не добавлена');
			return;
		}

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
				makeRefresh();
			})
			.catch((error) => console.log('Ошибка добавления данных:', error))
			.finally(() => setInProcess(false));
	};

	return (
		<button className="add-button" onClick={onAddTask} disabled={inProcess}>
			Добавить задание
		</button>
	);
};
