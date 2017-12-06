import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ChartWebView from './ChartWebView.js';
import { userRideCreate, userTrackUpdate } from '../actions';
import { Card, CardSection, Button, Input, TextAreaInput } from './common';

//data = ride data: time, distance, avg speed, avg power, avg cadence,avg heart rate
class RideSummaryData extends Component {
	saveRideData() {
		const {
			trackTimeTotal,
			trackAvgSpeed,
			trackDistance,
			trackAvgPower,
			trackAvgCadence,
			trackAvgHeartRate,
			title,
			notes
		} = this.props;
		//call action creator to save ride data to db
		this.props.userRideCreate({
			trackTimeTotal,
			trackAvgSpeed,
			trackDistance,
			trackAvgPower,
			trackAvgCadence,
			trackAvgHeartRate,
			title,
			notes
		});
		Actions.Profile();
	}

	cancelRideData() {
		Actions.TrackRide();
	}

	// rideDataUpdate({ prop, value }) {
	// 	this.props[prop] = value;
	// 	console.log(this.props[prop]);
	// }

	render() {
		const {
			cardStyle,
			headerTextStyle,
			chart1Style,
			textStyle,
			cardSectionStyle,
			statContainerStyle
		} = styles;

		const {
			trackTimeTotal,
			trackAvgSpeed,
			trackDistance,
			trackAvgPower,
			trackAvgCadence,
			trackAvgHeartRate,
			title,
			notes
		} = this.props;

		return (
			<View>
				<View style={chart1Style}>
					<ChartWebView />
				</View>

				<Card style={cardStyle}>
					<CardSection style={cardSectionStyle}>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Time</Text>
							<Text style={textStyle}> {trackTimeTotal}</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Distance</Text>
							<Text style={textStyle}> {trackDistance} miles</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Avg Spd</Text>
							<Text style={textStyle}>{trackAvgSpeed} mph</Text>
						</View>
					</CardSection>

					<CardSection style={cardSectionStyle}>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Avg Pwr</Text>
							<Text style={textStyle}>{trackAvgPower} watts</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Avg Cad.</Text>
							<Text style={textStyle}>{trackAvgCadence} rpm</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Avg Hrt Rt</Text>
							<Text style={textStyle}>{trackAvgHeartRate} bpm</Text>
						</View>
					</CardSection>
					<CardSection>
						<Input
							label="Title"
							placeholder="Title"
							value={this.props.title}
							onChangeText={value =>
								this.props.userTrackUpdate({ prop: 'title', value })}
						/>
					</CardSection>
					<CardSection>
						<TextAreaInput
							label="Notes"
							placeholder="notes from your ride..."
							value={this.props.notes}
							onChangeText={value =>
								this.props.userTrackUpdate({ prop: 'notes', value })}
						/>
					</CardSection>
					<CardSection
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<Button onPress={this.saveRideData.bind(this)}>Save</Button>
						<Button onPress={this.cancelRideData.bind(this)}>Cancel</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}
// state or destructured state of {userTrackRide}  comes from key names from reducers/index.js file
const mapStateToProps = ({ userTrackRide }) => {
	const {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate,
		title,
		notes
	} = userTrackRide;

	return {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate,
		title,
		notes
	};
};

const styles = {
	cardStyle: {
		marginTop: 5
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
	headerTextStyle: {
		fontSize: 18,
		fontWeight: '600',
		alignSelf: 'center',
		paddingTop: 5
	},
	textStyle: {
		lineHeight: 15,
		fontSize: 14,
		alignSelf: 'center',
		fontWeight: '400',
		paddingTop: 5,
		paddingBottom: 10
	},
	textAreaStyle: {
		height: 100
	},
	chart1Style: {
		height: '30%',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5
	},
	cardSectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

export default connect(mapStateToProps, { userRideCreate, userTrackUpdate })(RideSummaryData);
