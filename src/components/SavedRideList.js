import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { userRideFetch } from '../actions';
import ListItem from './ListItem.js';

class SavedRideList extends Component {
	componentWillMount() {
		// console.log('this.props', this.props, 'this.props.rides', this.props.rides);
		this.props.userRideFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
		this.props.userRideFetch();
	}

	createDataSource({ rides }) {
		// console.log('createDataSource rides', rides, 'this.props', this.props);
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
//
// const mapStateToProps = ({ userTrackRide }) => {
//
// 	let { rides } = userTrackRide;
//
// 	rides = rides.map(ride => [ride.title, ride._id]);
//
// 	return { rides };
// };

const mapStateToProps = ({ userTrackRide }) => {
	let { rides } = userTrackRide;
	rides = _.map(rides, (val, _id) => ({ ...val, _id }));

	return { rides };
};

export default connect(mapStateToProps, { userRideFetch })(SavedRideList);
