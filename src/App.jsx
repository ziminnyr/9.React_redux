import { TODO_LIST } from './assets/assets.env';
import { AddTaskButton, SortedListButton, FilterInput, TaskList } from './component';
import './index.css';

export const TodoList = () => {
	return (
		<>
			<AddTaskButton />
			<SortedListButton />
			<FilterInput />
			<TaskList />
		</>
	);
};
