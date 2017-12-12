import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import { userRideFetch } from '../actions';
import ListItem from './ListItem.js';

class SavedRideList extends Component {
	componentWillMount() {
		this.props.userRideFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource({ rides }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(rides);
	}

	renderRow(ride) {
		return <ListItem ride={ride} />;
	}

	render() {
		return (
			<ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
		);
	}
}

const mapStateToProps = ({ userTrackRide }) => {
	// let { rides } = userTrackRide;
	let { rides } = userTrackRide;

	rides = rides.map(ride => [ride.title, ride._id]);

	return { rides };
};

export default connect(mapStateToProps, { userRideFetch })(SavedRideList);
