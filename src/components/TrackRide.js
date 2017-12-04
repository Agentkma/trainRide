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
		this.interval = setInterval(this.onTick.bind(this));
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onTick() {
		if (this.state.timeRunning) {
			const now = Date.now();
			this.setState({
				elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
				previousTime: Date.now()
			});
		}
	}

	onStart() {
		this.onTick.bind(this);
		this.setState({
			timeRunning: true,
			previousTime: Date.now()
		});
	}
	onPause() {
		this.onTick.bind(this);
		this.setState({
			timeRunning: false,
			previousTime: Date.now()
		});
	}
	onEnd() {
		// call action creator to save elapsedTime to to totalTime
		this.props.userTrackUpdate({ trackTimeTotal: this.state.elapsedTime });
		console.log('trackTimeTotal', this.props.trackTimeTotal);
	}

	renderBtnStartOrPause() {
		return this.state.timeRunning ? (
			<Button onPress={this.onPause.bind(this)}>Pause</Button>
		) : (
			<Button onPress={this.onStart.bind(this)}>Start</Button>
		);
	}

	render() {
		//TODO function not working prop
		function msToTime(duration) {
			let seconds = parseInt((duration / 1000) % 60);
			let minutes = parseInt((duration / (1000 * 60)) % 60);
			let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

			hours = hours < 10 ? `0${hours}` : hours;
			minutes = minutes < 10 ? `0${minutes}` : minutes;
			seconds = seconds < 10 ? `0${seconds}` : seconds;

			return `${hours}:${minutes}:${seconds}`;
		}
		const time = Math.floor(this.state.elapsedTime / 1000);
		const currentTime = msToTime(time);

		console.log('elapsedTime', this.state.elapsedTime, 'time', time);
		const { statContainerStyle, textStyle } = styles;
		return (
			<View>
				<Card style={{ marginTop: 0 }}>
					<CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={statContainerStyle}>
							<Text style={textStyle}>Time</Text>
							<Text style={textStyle}>{currentTime}</Text>
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
						<Button onPress={this.onEnd.bind(this)}>END</Button>
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
