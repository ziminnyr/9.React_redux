import { useContext } from 'react';
import { AppContext } from '../assets/context';

export const TaskList = () => {
	const { todos, inProcess, onDeleteTask, onUpdateTask } = useContext(AppContext);

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
