import {
    TOGGLE_OVERLAY
} from '../actions/OverlayActions';

const initialState = {
	open: false,
	content: '',
	transparent: false
};

export function overlayReducer(state = initialState, action) {

	switch (action.type) {
		case TOGGLE_OVERLAY:
			return {
				...state,
				open: !state.open,
				content: state.open ? '' : action.content,
				transparent: action.transparent
			};
		default:
			return state;
	}
}