import {
	SWITCH_NAV,
	ADD_TO_LIST,
	REMOVE_FROM_LIST
} from './ActionTypes';

/*
 * action creators
 */

export function switchNav(state) {
	return { type: SWITCH_NAV, navOpen: state };
}

export function addToList(item) {
	return { type: ADD_TO_LIST, item };
}

export function removeFormList(id) {
	return { type: REMOVE_FROM_LIST, id };
}