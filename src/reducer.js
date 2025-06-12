const initialState = {
	todos: [],
	originalTodos: [],
	isSorted: false,
	inProcess: false,
	needReload: false,
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'CHANGE_WHAT':
			return initialState;

		default:
			return state;
	}
};
