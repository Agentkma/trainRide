import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection, Button, Confirm } from './common';
import { userCreate, userUpdate, userSave, userDelete } from '../actions';
import UserProfileForm from './UserProfileForm';
import SavedRideList from './SavedRideList';

class UserProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}

	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
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

	// onAccept() {
	// 	const { uid } = this.props.EmployeeEdit;
	// 	this.props.employeeDelete({ uid });
	// }
	//
	// onDecline() {
	// 	this.setState({ showModal: false });
	// }

	// confirmModal() {
	// 	return this.state.showModal ? (
	// 		<Confirm onAccept={this.onAccept.bind(this)} onDecline={this.onDecline.bind(this)}>
	// 			Are you sure you want to delete this?
	// 		</Confirm>
	// 	) : (
	// 		<View />
	// 	);
	// }

	renderCreateOrSaveBtn() {
		const { _id } = this.props;
		if (_id) {
			return <Button onPress={this.onCreateButtonPress.bind(this)}>Create</Button>;
		}
		return <Button onPress={this.onSaveButtonPress.bind(this)}>Save Changes</Button>;
	}

	// <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
	// 	Delete
	// </Button>

	render() {
		const { parentContainerStyle, savedRidesContainer } = styles;
		return (
			<Card style={parentContainerStyle}>
				<UserProfileForm />

				<CardSection style={savedRidesContainer}>
					<SavedRideList />
					<Text>Saved Ride List</Text>
					{this.confirmModal()}
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

export default connect(mapStateToProps, { userCreate, userUpdate, userSave, userDelete })(
	UserProfileEdit
);
