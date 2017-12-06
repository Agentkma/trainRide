import ChartWebView from './ChartWebView.js';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { userRideCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

//data = ride data: time, distance, avg speed, avg power, avg cadence,avg heart rate
class RideSummaryData extends Component {
	saveRideData() {
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
	}

	rideDataUpdate({ prop, value }) {
		this.props.prop = value;
		console.log(this.props.prop);
	}

	render() {
		const { headerContentStyle, chart1, textStyle } = styles;
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
				<Text>Test Chart</Text>
				<ChartWebView style={chart1} />

				<Card>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Time: {trackTimeTotal}</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Distance: {trackDistance} miles</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Avg Speed: {trackAvgSpeed} mph</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Avg Power: {trackAvgPower} watts</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Avg Cadence: {trackAvgCadence} spm</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={headerContentStyle}>
							<Text style={textStyle}>Avg Heart Rt: {trackAvgHeartRate} bpm</Text>
						</View>
					</CardSection>
					<CardSection>
						<Input
							label="Title"
							placeholder="jane"
							value={this.props.title}
							onChangeText={value =>
								this.state.rideDataUpdate({ prop: 'title', value })}
						/>
					</CardSection>
					<CardSection
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<Button onPress={this.saveRideData()}>Save</Button>
						<Button onPress={this.cancleRideData()}>Cancel</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}

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
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	},
	textStyle: {
		lineHeight: 20,
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	},
	chart1: {
		height: 150,
		flex: 1,
		width: '100%'
	}
};

export default connect(mapStateToProps, { userRideCreate })(RideSummaryData);
