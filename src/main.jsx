import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { TodoList } from './App.jsx';
import { todoStore } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<h1>Список дел</h1>
		<Provider store={todoStore}>
			<TodoList />
		</Provider>
	</React.StrictMode>,
);
