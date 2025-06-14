import { NEED_RELOAD, SET_IN_PROCESS, SET_IS_SORTED } from '../constants';

const initialState = {
	isSorted: false,
	inProcess: false,
	needReload: 0,
};

export const stateReducer = (state = initialState, { type, payload }) => {
	const rewriteState = (opt) => ({ ...state, [opt]: payload });

	switch (type) {
		case SET_IN_PROCESS:
			return rewriteState('inProcess');
		case SET_IS_SORTED:
			return rewriteState('isSorted');
		case NEED_RELOAD:
			return { ...state, needReload: state.needReload + 1 };
		default:
			return state;
	}
};
