import { SET_ORIGINAL_TODO, SET_TODO_LIST } from '../constants';

const initialTodoListState = {
	todos: [],
	originalTodos: [],
};

export const todoListReducer = (state = initialTodoListState, { type, payload }) => {
	const rewriteState = (opt) => ({ ...state, [opt]: payload });

	switch (type) {
		case SET_TODO_LIST:
			return rewriteState('todos');
		case SET_ORIGINAL_TODO:
			return rewriteState('originalTodos');
		default:
			return state;
	}
};
