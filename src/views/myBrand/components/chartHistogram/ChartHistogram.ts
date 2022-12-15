import Highcharts, {Options, Chart } from 'highcharts';
import HistogramModule from 'highcharts/modules/histogram-bellcurve';

HistogramModule(Highcharts);

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export interface IButtonToggle {
	label: string;
	value: string;
	selected: boolean
}

export interface ICardHistogram{
	title: string;
	toggles?: Array<IButtonToggle>;
	data: Array<number>,
}

export default class ChartHistogram{
	m_containerId: string;
	m_chart: Chart | null = null;
	m_data: Array<number> = [];
	m_title: string = "";
	m_color: string = "#7cb5ec";
	
	constructor(p_containerId: string){
		this.m_containerId = p_containerId;
	}

	get title(): string {
		return this.m_title;
	}

	set title(p_title: string){
		this.m_title = p_title;
	}
	
	get color(): string {
		return this.m_color;
	}

	set color(p_color: string){
		this.m_color = p_color;
	}

	get data(): Array<number>{
		return this.m_data
	}

	set data( p_data: Array<number>){
		this.m_data = p_data;
		this.m_chart?.series[1].setData(p_data)
	}

	createChart() : void {
		const option = {
			chart: {
				renderTo: this.m_containerId,
				backgroundColor: 'transparent',
				type: 'histogram',
				style: {
					fontFamily: 'PT Serif'
				},
			},
			title: {
				text: '',
			},
			credits: {
				enabled: false
			},
			/*
			xAxisX: {
				type: 'category',
				labels: {
					rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				},
				crosshair: true
			},
			*/
			xAxis: [{
				title: {
					text: ''
				},
				alignTicks: false,
				opposite: false,
			}, {
				title: {
					text: 'Histogram'
				},
				alignTicks: false,
				//tickInterval: getBinWidth(data, 5),
				tickAmount: 6,
				//min: 0.0,
				//max: 1.0
				// labels: {
				// 	rotation: -45,
				// 	style: {
				// 		fontSize: '13px',
				// 		fontFamily: 'Verdana, sans-serif'
				// 	}
				// },
			}],
			/*
			yAxis: {
				title: {
					text: 'Snow depth (m)'
				},
			},
			*/
			yAxis: [{
				title: {
					text: ''
				}
			}, {
				title: {
					text: 'Histogram'
				},
			}],
			tooltip: {
				pointFormat: '<span style="font-size:10px">{point.x:.2f} - {point.x2:.2f}</span><table><tr><td style="color:{series.color};padding:0">Count: </td>' +
					'<td style="padding:0"><b>{point.y:.1f}</b></td></tr></table>',
				shared: true,
				useHTML: true
			},
			// plotOptions: {
			// 	column: {
			// 		pointPadding: 0.1,
			// 		borderWidth: 0
			// 	}
			// },
			plotOptions: {
				histogram: {
					//binWidth should be dynamic based on the data
					// binWidth: 50,
					//binWidth: getBinWidth(data, 5),
					legendType: "point",
					pointPadding: 0.02,
				},
			},

			series:  [{
				name: '',
				type: 'histogram',
				xAxis: 1,
				yAxis: 1,
				baseSeries: 's1',
				zIndex: -1,
				showInLegend: false
			}, {
				name: '',
				type: 'scatter',
				data: this.m_data,
				visible: false,
				id: 's1',
				marker: {
					radius: 0
				},
				showInLegend: false
			}],
			exporting: {
				enabled: false
			}
		
		}
		this.m_chart = new Highcharts.Chart(option as Options);
	}
}



// var data = [0, 0.0342, 0.094, 0.1232, 0.1192, 0.15, 0.1129, 0.1436, 0.2804, 0.0208, 0, 0, 0.15, 0, 0, 0.0068, 0.004, 0.15, 0.2347, 0, 0.1045, 0.1504, 0.125, 0.1138, 0, 0.0951, 0.1694, 0, 0.2161, 0.2095, 0.394, 0.025, 0, 0.0695, 0.0608, 0.15, 0, 0, 0.1107, 0.1156, 0.0659, 0.4621, 0.15, 0.1341, 0.15, 0.4621, 0.106, 0.0853, 0, 0, 0, 0.2376, 4.235, 0.15, 3.125, 3.275, 0.0876, 0.2679, 0.2211, 0.2676, 0.275, 0.0265, 0.1059, 0.2146, 0.15, 0.0132, 0.3545, 0.2244, 0.1121, 12, 12.2];
// var numItems = data.length;

function getBinWidth(dataArray: Array<number>, numberOfBins: number): number {
	const dataMax = Highcharts.arrayMax(dataArray);
	const dataMin = Highcharts.arrayMin(dataArray);
	const binsWidth = (dataMax - dataMin) / numberOfBins
	return Math.ceil(binsWidth);
}

// Highcharts.chart('container', {
//	 title: {
//		 text: 'Highcharts Histogram'
//	 },
//	 /*
//	 tooltip: {
//		 formatter: function() {
//			 return 'Count: <b>' + this.y;
//		 }
//	 },
//	 */
//	 xAxis: [{
//		 title: {
//			 text: ''
//		 },
//		 alignTicks: false,
//		 opposite: false
//	 }, {
//		 title: {
//			 text: 'Histogram'
//		 },
//		 alignTicks: false,
//		  //tickInterval: getBinWidth(data, 5),
//		 tickAmount: 6,
//		 //min: 0.0,
//		 //max: 1.0
//	 }],
//	 yAxis: [{
//		 title: {
//			 text: ''
//		 }
//	 }, {
//		 title: {
//			 text: 'Histogram'
//		 },
//	 }],
//	 plotOptions: {
//		 histogram: {
//			 //binWidth should be dynamic based on the data
//			 binWidth: 0.4,
//			 //binWidth: getBinWidth(data, 5),
//			 legendType: "point",
//			 pointPadding: 0.02,
//		 },
//	 },
//	 series: [
//	 		{
//			 name: '',
//			 type: 'histogram',
//			 xAxis: 1,
//			 yAxis: 1,
//			 baseSeries: 's1',
//			 zIndex: -1,
//			 showInLegend: false
//		 }, {
//			 name: '',
//			 type: 'scatter',
//			 data: data,
//			 visible: false,
//			 id: 's1',
//			 marker: {
//				 radius: 0
//			 },
//			 showInLegend: false
//		 },
//	 ]
// });
