import {
    TOGGLE_OVERLAY
} from '../actions/OverlayActions';

const initialState = {
	open: false,
	content: ''
};

export function overlayReducer(state = initialState, action) {

	switch (action.type) {
		case TOGGLE_OVERLAY:
			return { ...state, open: !state.open, content: state.open ? '' : action.content };
		default:
			return state;
	}
}