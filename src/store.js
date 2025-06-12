import { createStore } from 'redux';
import { appReducer } from './reducer.js';

export const todoStore = createStore(appReducer);
