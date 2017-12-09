import { USER_PROFILE_CREATE, USER_PROFILE_READ, USER_PROFILE_UPDATE } from '../actions/types.js';

const INITIAL_STATE = {
	name: '',
	location: '',
	bio: '',
	gear: '',
	_id: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_PROFILE_CREATE:
			return state;
		case USER_PROFILE_READ:
			return action.payload;
		case USER_PROFILE_UPDATE:
			// action.payload will be like { prop: "name", value: "Jane"}
			//[action.payload.prop] is ES6 key interpolation
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;
	}
};
