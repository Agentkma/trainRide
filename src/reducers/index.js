import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';
import UserProfileFormReducer from './UserProfileFormReducer.js';
import UserReducer from './UserReducer.js';

export default combineReducers({
	auth: AuthReducer,
	userProfileForm: UserProfileFormReducer,
	user: UserReducer
});
