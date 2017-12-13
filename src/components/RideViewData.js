import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ChartWebView from './ChartWebView.js';
import { userTrackUpdate } from '../actions';
import { Card, CardSection, Button, Input, TextAreaInput } from './common';

class RideViewData extends Component {
	saveRideData() {
		const { title, notes } = this.props.rides;

		//call action creator to save ride data to db
		this.props.userTrackUpdate({
			title,
			notes
		});
		Actions.main({ type: 'reset' });
	}

	closeRideView() {
		Actions.TrackRide({ type: 'reset' });
	}

	render() {
		const {
			cardStyle,
			headerTextStyle,
			chart1Style,
			textStyle,
			cardSectionStyle,
			statContainerStyle
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
							value={title}
							onChangeText={value =>
								this.props.userTrackUpdate({ prop: 'title', value })}
						/>
					</CardSection>
					<CardSection>
						<TextAreaInput
							label="Notes"
							placeholder="notes from your ride..."
							value={notes}
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
						<Button onPress={this.closeRideView.bind(this)}>Close</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}

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
		paddngBottom: 10
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

// state or destructured state of {userTrackRide}  comes from key names from reducers/index.js file
const mapStateToProps = ({ userTrackRide }) => {
	const { rides, _id } = userTrackRide;

	return {
		rides,
		_id
	};
};

export default connect(mapStateToProps, { userTrackUpdate })(RideViewData);
