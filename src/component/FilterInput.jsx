import { useContext } from 'react';
import { AppContext } from '../assets/context';
import debounce from 'lodash.debounce';

export const FilterInput = () => {
	const { filterTasks } = useContext(AppContext);

	return <input className="search-input" type="text" onChange={debounce((e) => filterTasks(e.target.value), 500)}></input>;
};
