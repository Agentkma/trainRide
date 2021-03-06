import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { CardSection, Confirm } from './common';
import { userRideDelete, userRideFetch, userSavedRideView } from '../actions';

const viewIcon = require('../img/icon_pageview_1x.png');
const deleteIcon = require('../img/icon_delete_1x.png');

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}

	onAccept() {
		const id = this.props.ride._id;
		this.props.userRideDelete(id);
		this.setState({ showModal: false });
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

	deleteRide() {
		this.setState({ showModal: true });
	}

	viewRideStats() {
		const id = this.props.ride._id;
		this.props.userSavedRideView(id);
		Actions.RideViewData();
	}

	render() {
		const { rowStyle, titleStyle, iconContainerStyle, iconImageStyle } = styles;

		const title = this.props.ride.title;

		return (
			<View style={rowStyle}>
				<CardSection>
					<Text style={titleStyle}>{title}</Text>
					<View style={iconContainerStyle}>
						<TouchableOpacity onPress={this.viewRideStats.bind(this)}>
							<View style={iconImageStyle}>
								<Image source={viewIcon} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.deleteRide.bind(this)}>
							<View style={iconImageStyle}>
								<Image source={deleteIcon} />
							</View>
						</TouchableOpacity>
						{this.confirmModal()}
					</View>
				</CardSection>
			</View>
		);
	}
}

const styles = {
	rowStyle: {
		flex: 1
	},
	titleStyle: {
		fontSize: 24,
		paddingLeft: 5,
		flex: 3,
		color: 'black'
	},
	iconContainerStyle: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		paddingRight: 5
	},
	iconImageStyle: {
		width: '25%',
		height: '100%'
	}
};

export default connect(null, { userRideDelete, userRideFetch, userSavedRideView })(ListItem);
