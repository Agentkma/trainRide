import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Input, TextAreaInput } from './common';
import { userUpdate } from '../actions';

class UserProfileForm extends Component {
	render() {
		return (
			<View>
				<CardSection>
					<Input
						label="Name"
						placeholder="jane"
						value={this.props.name}
						onChangeText={value => this.props.userUpdate({ prop: 'name', value })}
					/>
				</CardSection>
				<CardSection>
					<Input
						label="Location"
						placeholder="Boulder, CO"
						value={this.props.location}
						onChangeText={value => this.props.userUpdate({ prop: 'location', value })}
					/>
				</CardSection>

				<CardSection>
					<TextAreaInput
						label="Bio"
						placeholder="describe yourself..."
						value={this.props.bio}
						onChangeText={value => this.props.userUpdate({ prop: 'bio', value })}
					/>
				</CardSection>

				<CardSection>
					<TextAreaInput
						label="Gear"
						placeholder="Bike. Helmet. Etc."
						value={this.props.gear}
						onChangeText={value => this.props.userUpdate({ prop: 'gear', value })}
					/>
				</CardSection>
			</View>
		);
	}
}

// const styles = {
// 	inputBioStyle: {
// 		height: 100
// 	}
// };

const mapStateToProps = ({ userProfile }) => {
	const { name, location, bio, gear } = userProfile;

	return {
		name,
		location,
		bio,
		gear
	};
};

export default connect(mapStateToProps, { userUpdate })(UserProfileForm);
