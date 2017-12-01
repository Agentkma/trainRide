import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN
} from '../actions/types.js';

const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	error: '',
	loading: false
};
// return: new object with all state key/vals & add new email: action.payload key/val pair
// must return new object or Redux will not see/recognize a change

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case USER_LOGIN:
			return { ...state, loading: true, error: '' };
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				...INITIAL_STATE,
				user: action.payload
			};
		case USER_LOGIN_FAIL:
			return { ...state, error: 'Authentication Failed', password: '', loading: false };

		default:
			return state;
	}
};
