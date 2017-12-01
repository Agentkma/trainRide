import { USER_RIDE_FETCH_SUCCESS } from '../actions/types.js';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_RIDE_FETCH_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
