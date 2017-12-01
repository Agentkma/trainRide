import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';

import { Card, CardSection, Button, Confirm } from './common';
import { userUpdate, userSave, userDelete } from '../actions';
import UserProfileForm from './UserProfileForm';

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

	onButtonPress() {
		const { name, phone, shift, uid } = this.props;
		this.props.employeeSave({ name, phone, shift, uid });
	}
	onTextPress() {
		const { phone, shift } = this.props;

		Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}

	onAccept() {
		const { uid } = this.props.EmployeeEdit;
		this.props.employeeDelete({ uid });
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	confirmModal() {
		return this.state.showModal ? (
			<Confirm onAccept={this.onAccept.bind(this)} onDecline={this.onDecline.bind(this)}>
				Are you sure you want to delete this?
			</Confirm>
		) : (
			<View />
		);
	}

	render() {
		return (
			<Card>
				<UserProfileForm />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
				</CardSection>
				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Fire Employee
					</Button>
				</CardSection>
				{this.confirmModal()}
			</Card>
		);
	}
}

// state or destructured state of {user}  comes from key names from reducers/index.js file

const mapStateToProps = ({ user }) => {
	const { name, location, bio, gear } = user;

	return {
		name,
		location,
		bio,
		gear
	};
};

export default connect(mapStateToProps, { userUpdate, userSave, userDelete })(UserProfileEdit);
