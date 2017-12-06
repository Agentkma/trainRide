import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';
import UserProfileFormReducer from './UserProfileFormReducer.js';
import UserTrackRideReducer from './UserTrackRideReducer.js';

export default combineReducers({
	auth: AuthReducer,
	userProfile: UserProfileFormReducer,
	userTrackRide: UserTrackRideReducer
});
