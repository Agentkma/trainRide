import {
	USER_UDATE,
	USER_CREATE,
	USER_RIDE_FETCH_SUCCESS,
	USERS_RIDE_SAVE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {
	name: '',
	location: '',
	bio: '',
	gear: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_UDATE:
			// action.payload will be like { prop: "name", value: "Jane"}
			//[action.payload.prop] is ES6 key interpolation
			return { ...state, [action.payload.prop]: action.payload.value };
		case USER_CREATE:
			return { ...state, ...INITIAL_STATE };
		case USER_RIDE_FETCH_SUCCESS:
			return { ...state, ...INITIAL_STATE };
		case USERS_RIDE_SAVE_SUCCESS:
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
