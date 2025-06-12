import { useEffect, useState } from 'react';
import { TODO_LIST } from './assets/assets.env';
import { AddTaskButton, SortedListButton, FilterInput, TaskList } from './component';
import './index.css';

export const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [originalTodos, setoriginalTodos] = useState([]);
	const [inProcess, setInProcess] = useState(false);
	const [needReload, setNeedReload] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	const makeRefresh = () => setNeedReload(!needReload);

	useEffect(() => {
		fetch(TODO_LIST)
			.then((loadedTodos) => loadedTodos.json())
			.then((tasks) => {
				setTodos(tasks);
				setoriginalTodos(tasks);
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
				makeRefresh();
			})
			.catch((error) => console.log('Ошибка обновления данных:', error))
			.finally(() => setInProcess(false));
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
				makeRefresh();
			})
			.catch((error) => console.log('Ошибка удаления данных:', error))
			.finally(() => setInProcess(false));
	};

	//сортировка заданий из БД
	const sortTasks = () => {
		const sortedTodos = isSorted ? [...todos].sort((a, b) => a.id - b.id) : [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setTodos(sortedTodos);
		setIsSorted(!isSorted);
	};

	const filterTasks = (searchStr) => {
		if (!searchStr) {
			setTodos([...originalTodos]);
			return;
		}
		const listOfTodos = [...originalTodos];
		const filteredTodos = listOfTodos.filter((task) => task.title.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);

		// const filteredTodos = [...todos].filter([...todos].indexOf(searchStr) > -1);
		setTodos(filteredTodos);
	};

	const AppStates = { inProcess, setInProcess, makeRefresh, sortTasks, isSorted, filterTasks, onDeleteTask, onUpdateTask, todos };

	return (
		<>
			<AppContext value={AppStates}>
				<AddTaskButton />
				<SortedListButton />
				<FilterInput />
				<TaskList />
			</AppContext>
		</>
	);
};
