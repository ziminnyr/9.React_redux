export const selectTodos = (state) => state.tasks.todos;
export const selectOriginalTodos = (state) => state.tasks.originalTodos;
export const selectInProcess = (state) => state.appState.inProcess;
export const selectIsSorted = (state) => state.appState.isSorted;
export const selectNeedReload = (state) => state.appState.needReload;
