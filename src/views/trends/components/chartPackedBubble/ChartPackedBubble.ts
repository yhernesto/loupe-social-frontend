import Highcharts, {Options, Chart, SeriesOptionsType, SeriesPackedbubbleOptions, Series } from 'highcharts';
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);


import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
export interface ICardPackedBubble extends ICardSectionWrapper{
    title: string;
    labelThreshold: number
	zMin: number,
	zMax: number,
    series: Array<SeriesPackedbubbleOptions>
}

export {SeriesPackedbubbleOptions}

export default class ChartPackedBubble {
    private m_containerId: string;  
    private m_chart: Chart | null = null;

	private m_threshold: number = 0;
	private _zMin: number = 0;
	private _zMax: number = 1000;

    m_series: Array<SeriesPackedbubbleOptions> = [{type: 'packedbubble', name: '', data: []}];

    constructor(p_containerId: string){
        this.m_containerId = p_containerId;
    }

	get threshold(): number {
        return this.m_threshold
    }

    set threshold( p_val: number ) {
        this.m_threshold = p_val;
    }

	get zMin(): number{
		return this._zMin;
	}

	set zMin( p_val: number){
		this._zMin = p_val - 1;
	}

	get zMax(): number{
		return this._zMax;
	}

	set zMax( p_val: number){
		this._zMax = p_val + 1;
	}

    get series(): Array<SeriesPackedbubbleOptions>{
        return this.m_series
    }

    set series( p_series: Array<SeriesPackedbubbleOptions>){
		// Redraw attribute is disabled in the remove, addSeries and update functions because for large amounts of data the real time update is very slow.
        this.m_series = p_series;

        const _length: number = this.m_chart?.series.length || 0;
        Array.from({ length: _length }).forEach( () => { this.m_chart?.series[0]?.remove(false); } )

        p_series.forEach( (_series : SeriesPackedbubbleOptions) => {
            this.m_chart?.addSeries(_series as SeriesOptionsType, false);
        })

		this.m_chart?.redraw();

		this.m_chart?.update({
			plotOptions: {
				packedbubble:{
					// @ts-ignore: Unreachable code error
					zMin: this._zMin,
					zMax: this._zMax		
				} 
		}})

		this.m_chart?.series.forEach( (series : Series) => {
            series.points.forEach( (point ) => {
                point.update({
                        dataLabels: {
                            filter : {
                                property: 'y',
                                operator: '>',
                                value: this.m_threshold
                            }
                        }
                }, false)
            })
        })

		this.m_chart?.redraw();
    }
    

    createChart() : void {
        const option = {
            chart: {
                renderTo: this.m_containerId,
                backgroundColor: 'transparent',
                //TODO: packedbubble?? https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/packed-bubble
                type: 'packedbubble',
                // height: '100%',
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
                enabled: false,
                align: 'left',
                layout: 'vertical',
                verticalAlign: 'top',
                itemMarginTop: 10,
            },
        
            plotOptions: {
                packedbubble: {
                    minSize: '10%',
                    maxSize: '200%',
                    zMin: this._zMin,
                    zMax: this._zMax,
                    layoutAlgorithm: {
                        // splitSeries: 'true', // By default is false but need a string instead of a boolean
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: this.m_threshold
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },

            tooltip: {
                useHTML: true,
                // pointFormat: '<b>{point.name}:</b> {point.value}' // Useful if series would be split by groups
                pointFormat: 'Rating: <b>{point.value}</b>'
            },
            series: this.m_series //as SeriesOptionsType[]
            
            // Example Series
            /*
            series: [{
                name: 'Germany',
                type: 'packedbubble',
                data: [{
                    name: 'Germany',
                    value: 767.1
                }]
            },
            {
                name: 'Senegal',
                type: 'packedbubble',
                data: [{
                    name: "Senegal",
                    value: 8.2
                }]
            },
            {
                name: 'South Africa',
                type: 'packedbubble',
                data: [{
                    name: "South Africa",
                    value: 392.7
                }]
            }, as SeriesOptionsType[]
            */

            // Series group
            /*series: [{
                name: 'Europe',
                data: [{
                    name: 'Germany',
                    value: 767.1
                },
                {
                    name: 'Croatia',
                    value: 20.7
                }]
            },
            {
                name: 'Africa',
                data: [{
                    name: "Senegal",
                    value: 8.2
                },
                {
                    name: "South Africa",
                    value: 392.7
                }]
            }] as SeriesOptionsType[]
            */
        }
        this.m_chart = new Highcharts.Chart(option as Options);
    }
}