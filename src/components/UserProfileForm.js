import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Input, TextAreaInput } from './common';
import { userUpdate } from '../actions';

class UserProfileForm extends Component {
	render() {
		const { bioContainerStyle, inputBioStyle } = styles;
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

				<CardSection style={bioContainerStyle}>
					<TextAreaInput
						label="Bio"
						placeholder="describe yourself..."
						value={this.props.bio}
						onChangeText={value => this.props.userUpdate({ prop: 'bio', value })}
						style={inputBioStyle}
					/>
				</CardSection>
			</View>
		);
	}
}

const styles = {
	bioContainerStyle: {},
	inputBioStyle: {}
};

const mapStateToProps = ({ userProfile }) => {
	const { name, location, bio } = userProfile;

	return {
		name,
		location,
		bio
	};
};

export default connect(mapStateToProps, { userUpdate })(UserProfileForm);
