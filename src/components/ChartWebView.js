import React, { Component } from 'react';
import { WebView, Text } from 'react-native';
import WebFiles from '../webView/index.html';

// onMessage() in WebView allows bi directional data flow to web files and react-native
class ChartWebView extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.webview.postMessage('Hello from RN');
	// }
	// this.webview.postMessage('Hello from RN');

	onError() {
		// console.log('did not load');
	}
	onLoad() {
		// console.log('loaded');
	}

	onMessage(data) {
		//Prints out data that was passed.
		console.log(data);
	}

	render() {
		const { webViewStyle } = styles;

		return (
			<WebView
				ref="webview"
				onMessage={event => console.log(event.nativeEvent.data)}
				source={WebFiles}
				style={webViewStyle}
				startInLoadingState
				javaScriptEnabled
				domStorageEnabled
				onError={this.onError.bind(this)}
				onLoad={this.onLoad.bind(this)}
			/>
		);
	}
}

const styles = {
	webViewStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: '100%',
		width: '100%'
	}
};

export default ChartWebView;
