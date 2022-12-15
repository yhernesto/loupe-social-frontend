import Highcharts, {Options, Chart, PointOptionsObject, SeriesZigzagOptions} from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';

HeatmapModule(Highcharts);

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);


import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
export interface IButtonToggle {
	label: string;
	value: string;
	selected: boolean
}

export interface ICardHeatMap extends ICardSectionWrapper {
	title: string;
	toggles: Array<IButtonToggle>;
	data: Array<(Array<number>|PointOptionsObject)>
}

export { PointOptionsObject }

function getPointCategoryName(point: Highcharts.Point, dimension: string) {
	const series = point.series,
		isY = dimension === 'y',
		axis = series[isY ? 'yAxis' : 'xAxis'];
	return axis.categories[ (isY && point.y) ? point.y : point.x ];
}

export default class ChartHeatMap {
	m_title: string = '';
	m_containerId: string;  
	m_chart: Chart | null = null;

	m_data: Array<(Array<number>|PointOptionsObject)> = [];

	constructor(p_containerId: string){
		this.m_containerId = p_containerId;
	}

	get data(): Array<(Array<number>|PointOptionsObject)>{
		return this.m_data
	}

	set data( p_data: Array<(Array<number>|PointOptionsObject)>){
		this.m_data = p_data;
		this.m_chart?.series[0].setData(p_data)
	}

	get title(): string {
		return this.m_title;
	}
	set title(p_title: string) {
		this.m_title = p_title;

		this.m_chart?.series[0].update({name: this.m_title} as SeriesZigzagOptions, false);
	}

	createChart() : void {
		const option = {
			chart: {
				renderTo: this.m_containerId,
				backgroundColor: 'transparent',
				type: 'heatmap',
				style: {
					fontFamily: 'PT Serif'
				}
			},
			title: {
				text: '',
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			legend: {
				enabled: true,
				align: 'right',
				layout: 'vertical',
				margin: 0,
				verticalAlign: 'top',
				symbolHeight: 350
			},
		
			xAxis: {
				categories: Array.from({length: 24}, (_, i) => `${i + 0}`) // Arrays of hours as char
			},

			yAxis: {
				categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				title: '',
				reversed: true
			},

			colorAxis: {
				min: 0,
				minColor: '#FFFFFF',
				maxColor: "#FFA500",
			},

			tooltip: {
				formatter: function (this: Highcharts.TooltipFormatterContextObject) {
					return '<b>'+ getPointCategoryName(this.point, 'y') +'</b> at <b>' + getPointCategoryName(this.point, 'x') + '</b> hours<br/>there were <b>' +
						this.point.value + '</b> ' + this.series.name;
				}
			},
		
			series: [{
				type: 'heatmap',
				name: this.m_title,
				borderWidth: 1,
				data: this.m_data
					// [
					//	 [0, 0, 10],	[1, 0, 92],	[2, 0, 35],	[3, 0, 72],	[4, 0, 38],	[5, 0, 88],	[6, 0, 13],
					//	 [0, 1, 19],	[1, 1, 58],	[2, 1, 15],	[3, 1, 12],	[4, 1, 5],	[5, 1, 32],	[6, 1, 44],
					//	 [0, 2, 8],		[1, 2, 78],	[2, 2, 13],	[3, 2, 14],	[4, 2, 8],	[5, 2, 12],	[6, 2, 88],
					//	 [0, 3, 24],	[1, 3, 10],	[2, 3, 64],	[3, 3, 19],	[4, 3, 17],	[5, 3, 6],	[6, 3, 98],
					//	 [0, 4, 67],	[1, 4, 48],	[2, 4, 52],	[3, 4, 16],	[4, 4, 51],	[5, 4, 19],	[6, 4, 96],
					// ],
			}],
		}
		this.m_chart = new Highcharts.Chart(option as Options);
	}
}	