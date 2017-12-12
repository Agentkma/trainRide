import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { CardSection, Confirm } from './common';
import { userRideDelete } from '../actions';

const viewIcon = require('../img/icon_pageview_1x.png');
const deleteIcon = require('../img/icon_delete_1x.png');

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}
	//TODO how can i get _id from the rides array of ride objects?
	onAccept() {
		const { _id } = this.props;
		this.props.userRideDelete({ _id });
		Actions.main();
		// Actions.Profile();
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

	//
	deleteRide() {
		this.confirmModal();
	}

	render() {
		const { rowStyle, titleStyle, iconContainerStyle, iconImageStyle } = styles;

		const title = this.props.ride;
		console.log('this.props.ride', this.props.ride);
		return (
			<View style={rowStyle}>
				<CardSection>
					<Text style={titleStyle}>{title}</Text>
					<View style={iconContainerStyle}>
						<Image source={viewIcon} style={iconImageStyle} />
						<Image
							onPress={this.deleteRide.bind(this)}
							source={deleteIcon}
							style={iconImageStyle}
						/>
					</View>
					{this.confirmModal()}
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
		fontSize: 18,
		paddingLeft: 5,
		flex: 3,
		color: 'black'
	},
	iconContainerStyle: {
		flexDirection: 'row',
		flex: 1
	},
	iconImageStyle: {
		width: '25%',
		height: '100%'
	}
};

export default ListItem;
