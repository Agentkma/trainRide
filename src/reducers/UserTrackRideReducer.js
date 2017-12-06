import { USER_RIDE_CREATE, USER_RIDE_FETCH_SUCCESS, USER_TRACK_UPDATE } from '../actions/types.js';

const INITIAL_STATE = {
	trackTimeTotal: '00:58:01',
	trackAvgSpeed: 12.2,
	trackDistance: 23.4,
	trackAvgPower: 89,
	trackAvgCadence: 65,
	trackAvgHeartRate: 105,
	title: '',
	notes: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_RIDE_FETCH_SUCCESS:
			return action.payload;
		case USER_TRACK_UPDATE:
			// action.payload will be like { prop: "name", value: "Jane"}
			//[action.payload.prop] is ES6 key interpolation
			return { ...state, [action.payload.prop]: action.payload.value };
		case USER_RIDE_CREATE:
			return state;
		default:
			return state;
	}
};
