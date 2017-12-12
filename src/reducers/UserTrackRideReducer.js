import {
	USER_RIDE_CREATE,
	USER_RIDE_READ,
	USER_TRACK_UPDATE,
	USER_RIDE_DELETE,
	USER_SAVED_RIDE_VIEW
} from '../actions/types.js';

const INITIAL_STATE = {
	trackTimeTotal: '00:58:01',
	trackAvgSpeed: 12.2,
	trackDistance: 23.4,
	trackAvgPower: 223,
	trackAvgCadence: 65,
	trackAvgHeartRate: 105,
	title: '',
	notes: '',
	_id: '',
	rides: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_RIDE_CREATE:
			return state;
		case USER_TRACK_UPDATE:
			// action.payload will be like { prop: "name", value: "Jane"}
			//[action.payload.prop] is ES6 key interpolation
			return { ...state, [action.payload.prop]: action.payload.value };
		case USER_RIDE_READ:
			return { ...state, rides: action.payload };
		case USER_RIDE_DELETE:
			return state;
		case USER_SAVED_RIDE_VIEW:
			return {
				...state,
				rides: action.payload
			};
		default:
			return state;
	}
};
