import { combineReducers, createStore } from 'redux';
import { todoListReducer, stateReducer } from './reducers';

const appReducer = combineReducers({
	tasks: todoListReducer,
	appState: stateReducer,
});

export const todoStore = createStore(appReducer);
