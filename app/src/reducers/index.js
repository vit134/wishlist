import { combineReducers } from 'redux';
import {
	SWITCH_NAV,
	ADD_TO_LIST,
	REMOVE_FROM_LIST
} from '../actions/ActionTypes';

function navOpen(state = false, action) {
	switch (action.type) {
	case SWITCH_NAV:
		return !state;
	default:
		return state;
	}
}

function list(state = [], action) {
	switch (action.type) {
	case ADD_TO_LIST:
		return [...state, action.item];
	case REMOVE_FROM_LIST:
		return state.filter(el => el.id !== action.id);
	default:
		return state;
	}
}

export default combineReducers({
	list,
	navOpen
});
