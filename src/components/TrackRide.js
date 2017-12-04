import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { userTrackUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import MyWebMap from './MapWebView.js';

class TrackRide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0,
			previousTime: 0,
			timeRunning: false
		};
	}

	// lifecycle events
	componentDidMount() {
		this.interval = setInterval(this.onTick);
	}

	onStart() {
		this.onTick();
		this.setState({
			timeRunning: true,
			previousTime: Date.now()
		});
	}
	onPause() {
		this.onTick();
		this.setState({
			timeRunning: false,
			previousTime: Date.now()
		});
	}
	onEnd() {}

	onTick() {
		if (this.state.timeRunning) {
			const now = Date.now();
			this.setState({
				elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
				previousTime: Date.now()
			});
		}
	}
	renderBtnStartOrPause() {
		return this.props.timeRunning ? (
			<Button onPress={this.onPause}>Pause</Button>
		) : (
			<Button onPress={this.onStart}>Start</Button>
		);
	}

	render() {
		const time = Math.floor(this.props.trackTime / 1000);
		const { statContainerStyle, textStyle } = styles;
		return (
			<View>
				<Card style={{ marginTop: 0 }}>
					<CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={statContainerStyle}>
							<Text style={textStyle}>Time</Text>
							<Text style={textStyle}>{time}</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={textStyle}>Distance</Text>
							<Text style={textStyle}>{this.props.trackDistance}</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={{ flex: 1 }}>
							<MyWebMap />
							<Text>Testing Map</Text>
						</View>
					</CardSection>
					<CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						{this.renderBtnStartOrPause()}
						<Button onPress={this.onEnd}>END</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}

const styles = {
	statContainerStyle: {
		width: '47.5%',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5
	},
	textStyle: {
		lineHeight: 20,
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	}
};

const mapStateToProps = ({ userTrackRide }) => {
	const {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate
	} = userTrackRide;

	return {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate
	};
};

export default connect(mapStateToProps, { userTrackUpdate })(TrackRide);
