import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection, Button } from './common';
import {
	userCreate,
	userProfileUpdate,
	userProfileFetch,
	userSave,
	userDelete,
	userUpdate
} from '../actions';
import UserProfileForm from './UserProfileForm';
import SavedRideList from './SavedRideList';

class UserProfileEdit extends Component {
	componentWillMount() {
		this.props.userProfileFetch();
		_.each(this.props.ride, (value, prop) => {
			this.props.userUpdate({ value, prop });
		});
	}

	onCreateButtonPress() {
		const { name, location, bio } = this.props;
		this.props.userCreate({ name, location, bio });
	}

	onSaveButtonPress() {
		const { name, location, bio } = this.props;
		this.props.userProfileUpdate({ name, location, bio });
	}

	renderCreateOrSaveBtn() {
		const { _id } = this.props;

		if (_id) {
			return <Button onPress={this.onSaveButtonPress.bind(this)}>Save Changes</Button>;
		}
		return <Button onPress={this.onCreateButtonPress.bind(this)}>Create</Button>;
	}

	render() {
		const { parentContainerStyle, savedRidesContainer } = styles;
		return (
			<Card style={parentContainerStyle}>
				<UserProfileForm />

				<CardSection style={savedRidesContainer}>
					<SavedRideList />
				</CardSection>
				<CardSection>{this.renderCreateOrSaveBtn()}</CardSection>
			</Card>
		);
	}
}

const styles = {
	parentContainerStyle: {
		flex: 1
	},
	savedRidesContainer: {
		flex: 1
	}
};

// state or destructured state of {userProfile}  comes from key names from reducers/index.js file

const mapStateToProps = ({ userProfile }) => {
	const { name, location, bio, _id } = userProfile;

	return {
		name,
		location,
		bio,
		_id
	};
};

export default connect(mapStateToProps, {
	userCreate,
	userProfileUpdate,
	userProfileFetch,
	userSave,
	userDelete,
	userUpdate
})(UserProfileEdit);
