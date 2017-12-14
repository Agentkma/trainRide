import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import ChartWebView from './ChartWebView.js';
import { userTrackUpdate } from '../actions';
import { Card, CardSection } from './common';

class RideViewData extends Component {
	render() {
		const {
			mainContainerStyle,
			cardStyle,
			statHeaderStyle,
			chart1Style,
			statTextStyle,
			textStyle,
			headerStyle,
			cardSectionStyle,
			statContainerStyle,
			titleContainerStyle,
			notesContainerStyle
		} = styles;
		const { _id } = this.props;
		// console.log('id of ride selected', _id);
		const {
			trackTimeTotal,
			trackAvgSpeed,
			trackDistance,
			trackAvgPower,
			trackAvgCadence,
			trackAvgHeartRate,
			title,
			notes
		} = this.props.rides[_id];
		// console.log('this.props.rides[id]', this.props.rides[id]);

		return (
			<View style={mainContainerStyle}>
				<View style={chart1Style}>
					<ChartWebView />
				</View>

				<Card style={cardStyle}>
					<CardSection style={cardSectionStyle}>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Time</Text>
							<Text style={statTextStyle}> {trackTimeTotal}</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Distance</Text>
							<Text style={statTextStyle}> {trackDistance} miles</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Avg Spd</Text>
							<Text style={statTextStyle}>{trackAvgSpeed} mph</Text>
						</View>
					</CardSection>

					<CardSection style={cardSectionStyle}>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Avg Pwr</Text>
							<Text style={statTextStyle}>{trackAvgPower} watts</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Avg Cad.</Text>
							<Text style={statTextStyle}>{trackAvgCadence} rpm</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={statHeaderStyle}>Avg Hrt Rt</Text>
							<Text style={statTextStyle}>{trackAvgHeartRate} bpm</Text>
						</View>
					</CardSection>
					<CardSection style={titleContainerStyle}>
						<Text style={headerStyle}>Title</Text>
						<Text style={textStyle}>{title}</Text>
					</CardSection>
					<CardSection style={notesContainerStyle}>
						<Text style={headerStyle}>Notes</Text>
						<Text tyle={textStyle}>{notes}</Text>
					</CardSection>
				</Card>
			</View>
		);
	}
}

const styles = {
	mainContainerStyle: {
		flex: 1
	},
	cardStyle: {
		marginTop: 5,
		flex: 2
	},
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	statContainerStyle: {
		width: '31.5%',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5
	},
	statHeaderStyle: {
		fontSize: 18,
		fontWeight: '600',
		alignSelf: 'center',
		paddingTop: 5,
		paddingBottom: 5
	},
	statTextStyle: {
		lineHeight: 15,
		fontSize: 14,
		alignSelf: 'center',
		fontWeight: '400',
		paddingTop: 5,
		paddingBottom: 5
	},
	textStyle: {
		lineHeight: 15,
		fontSize: 14,
		fontWeight: '400',
		paddingTop: 10,
		paddingLeft: 10
	},
	headerStyle: {
		fontSize: 18,
		fontWeight: '600',
		paddingTop: 5,
		paddingRight: 10
	},
	titleContainerStyle: {
		flex: 1
	},
	notesContainerStyle: {
		flex: 2
	},
	chart1Style: {
		flex: 1,
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5
	},
	cardSectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1
	}
};

// state or destructured state of {userTrackRide}  comes from key names from reducers/index.js file
const mapStateToProps = ({ userTrackRide }) => {
	const { rides, _id } = userTrackRide;

	return {
		rides,
		_id
	};
};

export default connect(mapStateToProps, { userTrackUpdate })(RideViewData);
