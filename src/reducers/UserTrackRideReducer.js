import { USER_RIDE_FETCH_SUCCESS, USER_TRACK_UPDATE } from '../actions/types.js';

const INITIAL_STATE = {
	trackTimeTotal: 0,
	trackAvgSpeed: 0,
	trackDistance: 0,
	trackAvgPower: 0,
	trackAvgCadence: 0,
	trackAvgHeartRate: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_RIDE_FETCH_SUCCESS:
			return action.payload;
		case USER_TRACK_UPDATE:
			// action.payload will be like { prop: "name", value: "Jane"}
			//[action.payload.prop] is ES6 key interpolation
			return { ...state, [action.payload.prop]: action.payload.value };

		default:
			return state;
	}
};
