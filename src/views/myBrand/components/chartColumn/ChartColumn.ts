import Highcharts, {Options, Chart, SeriesOptionsType, XAxisOptions, SeriesColumnOptions } from 'highcharts';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

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

export interface ICardColumn extends ICardSectionWrapper{
	title: string;
	toggles?: Array<IButtonToggle>;
	series: Array<SeriesColumnOptions>,
	seriesDrillDown?: Array<SeriesColumnOptions>,
}

export default class ChartColumn{
	m_containerId: string;
	m_chart: Chart | null = null;
	m_series: Array<SeriesColumnOptions> = [{ type: 'column',  name: '', data: [] }];
	m_seriesDrillDown: Array<SeriesColumnOptions> | undefined = [{type: 'column', name: '', id: '', data: [] }];
	m_title: string = "";
	m_color: string = "#7cb5ec";
	m_units: string = "";
	m_details: boolean = false;

	constructor(p_containerId: string, color: string){
		this.m_containerId = p_containerId;
		this.m_color = color
		console.log('setted color: ' + this.m_color)
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

	get units(): string {
		return this.m_units;
	}

	set units(p_units: string){
		this.m_units = p_units;
	}

	get series(): Array<SeriesColumnOptions>{
		return this.m_series
	}

	set series( p_series: Array<SeriesColumnOptions>){
		this.m_series = p_series;

		const _length: number = this.m_chart?.series.length || 0;
		Array.from({ length: _length }).forEach( () => { this.m_chart?.series[0]?.remove(true); } )

		p_series.forEach( (_series : SeriesColumnOptions) => {
			this.m_chart?.addSeries(_series as SeriesOptionsType);
		})
	}

	get seriesDrillDown(): Array<SeriesColumnOptions> | undefined{
		return this.m_seriesDrillDown
	}

	set seriesDrillDown( p_seriesDrillDown: Array<SeriesColumnOptions> | undefined){
		this.m_seriesDrillDown = p_seriesDrillDown;
		// console.log('*********** seriesDrillDown:', p_seriesDrillDown)
		this.m_chart?.update({
			drilldown: {
				series: p_seriesDrillDown
			}
		})

	}

	createChart() : void {
		const option = {
			chart: {
				renderTo: this.m_containerId,
				backgroundColor: 'transparent',
				type: 'column',
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
			xAxis: {
				type: 'category',
				labels: {
					// rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				},
				crosshair: true
			},
			yAxis: {
				title: {
					text: ''
				},
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{point.name}: </td>' +
					'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			/*
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
			},
			*/
			plotOptions: {
				column: {
					pointPadding: 0.02,
					borderWidth: 0,
					// groupPadding: 0,
					borderColor: this.m_color,
					color: this.m_color,
				},
				// series: {
				// 	marker: {
				// 		enabled: true
				// 	}
				// }
			},
			series: this.m_series,

			drilldown: {
				series: this.m_seriesDrillDown
			},

			exporting: {
				enabled: false
			}
		
		}
		this.m_chart = new Highcharts.Chart(option as Options);
	}
}