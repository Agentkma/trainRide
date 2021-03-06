$(document).ready(() => {
	/* GLOBAL VARIABLES **********************************************************************************/
	const jsonAPI = './rideData.json';
	const myHeaders = new Headers();
	const fetchInit = {
		method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	};

	const $chart = $('#chart');
	const $chartAvg = $('#chartAvg');
	const powerChartOpts = {
		lines: {
			show: true,
			lineWidth: 1,
			fill: true,
			fillColor: 'red',
			steps: false
		},
		legend: {
			show: true
		},
		xaxis: {
			mode: 'number',
			show: true,
			position: 'bottom',
			min: 0,
			max: 500
		},
		yaxis: {
			mode: 'number',
			show: true,
			position: 'left',
			min: 0,
			max: 500
		},
		grid: {
			clickable: true,
			hoverable: true
		}
	};
	const ticks = [[0, '1'], [1, '5'], [2, '10'], [3, '15'], [4, '20']];
	const powerAvgChartOptions = {
		series: {
			bars: {
				show: true,
				lineWidth: 3,
				fill: true,
				fillColor: 'red',
				barWidth: 0.5
			},

			legend: {
				show: true
			},
			xaxis: {
				mode: 'number',
				show: true,
				position: 'bottom',
				min: 100,
				max: 700,
				tick: ticks,
				axisLabel: 'Avg Watts',
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				axisLabelPadding: 3,
				tickColor: '#5E5E5E'
			},
			yaxis: {
				mode: 'number',
				show: true,
				position: 'left',
				min: 0,
				max: 700
			},
			grid: {
				clickable: false,
				hoverable: false
			}
		}
	};
	const chartData = [];
	let powerData = [];

	let rideData;

	let maxPowerAvg20 = 0;
	let maxPowerAvg15 = 0;
	let maxPowerAvg10 = 0;
	let maxPowerAvg5 = 0;
	let maxPowerAvg1 = 0;
	let arrayMax20,
		arrayMax15,
		arrayMax10,
		arrayMax5,
		array20min,
		array15min,
		array10min,
		array5min;

	/* FUNCTIONS **********************************************************************************/
	const dataRequest = async () => {
		const response = await fetch(jsonAPI, fetchInit);
		const json = await response.json();
		rideData = json.samples;
		getChartData();
		createPowerChart();
		getPowerData();
		getHighestAvgPower();
		createAvgPowerChart();
	};

	function getChartData() {
		rideData.forEach(dataPoint => {
			const data = dataPoint.values;
			chartData.push([data.distance / 100, data.power]);
		});
	}

	function createPowerChart() {
		console.log(chartData);
		$.plot($chart, [chartData], powerChartOpts);

		$chart.bind('plotclick', (event, pos, item) => {
			if (circleMarker !== undefined) {
				mymap.removeLayer(circleMarker);
			}
			if (item) {
				// use item.datapoint to highlight the gps map
				const clickData = rideData.find(
					location => location.values.power === item.datapoint[1]
				);

				const latlngs = [clickData.values.positionLat, clickData.values.positionLong];

				circleMarker = L.circleMarker(latlngs, circleOptions).addTo(mymap);
			}
		});
	}

	function getPowerData() {
		powerData = rideData.map(data => {
			if (data.values.power === undefined) {
				return (data.values.power = 0);
			}
			return data.values.power;
		});
	}
	function getHighestAvgPower() {
		for (let i = 0; i < powerData.length; i++) {
			if (powerData[i] > maxPowerAvg1) {
				maxPowerAvg1 = powerData[i];
			}
		}

		for (let i = 0; i < powerData.length - 1200; i++) {
			array20min = powerData.slice(i, i + 1200);
			const sum = array20min.reduce((sum, value) => sum + value, 1);

			const avg = sum / 1200;

			if (avg > maxPowerAvg20) {
				maxPowerAvg20 = avg;
				arrayMax20 = array20min;
			}
		}

		for (let i = 0; i < arrayMax20.length - 900; i++) {
			array15min = arrayMax20.slice(i, i + 900);

			const sum = array15min.reduce((sum, value) => sum + value, 1);

			const avg = sum / 900;

			if (avg > maxPowerAvg15) {
				maxPowerAvg15 = avg;
				arrayMax15 = array15min;
			}
		}

		for (let i = 0; i < arrayMax15.length; i++) {
			if (i < arrayMax15.length - 600) {
				array10min = arrayMax15.slice(i, i + 600);

				const sum = array10min.reduce((sum, value) => sum + value, 1);

				const avg = sum / 600;

				if (avg > maxPowerAvg10) {
					maxPowerAvg10 = avg;
					arrayMax10 = array10min;
				}
			}
		}

		for (let i = 0; i < arrayMax10.length; i++) {
			if (i < arrayMax10.length - 300) {
				array5min = arrayMax10.slice(i, i + 300);

				const sum = array5min.reduce((sum, value) => sum + value, 1);

				const avg = sum / 300;

				if (avg > maxPowerAvg10) {
					maxPowerAvg5 = avg;
					arrayMax5 = array5min;
				}
			}
		}
	}

	function createAvgPowerChart() {
		const chartAvgDat = [];
		chartAvgDat.push(
			[0, maxPowerAvg1],
			[1, maxPowerAvg5],
			[2, maxPowerAvg10],
			[3, maxPowerAvg15],
			[4, maxPowerAvg20]
		);

		$.plot($chartAvg, [chartAvgDat], powerAvgChartOptions);
	}

	/* FUNCTION CALLS **********************************************************************************/

	dataRequest();
});
