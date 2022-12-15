import Highcharts, {Options, Chart, SeriesOptionsType } from 'highcharts';
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export interface IBubbleData {
    [index: number]:{
        x: number;
        y: number;
        z: number;
    }
}

export interface ISeries {
    [index: number]: {
    name: string;
    data: IBubbleData
    }
}

/**
{
    name: 'test1',
    data: [
        { x: 95, y: 95, z: 834 },
        { x: 86.5, y: 102.9, z: 1000 },
        { x: 80.8, y: 91.5, z: 242 },
        { x: 80.4, y: 102.5, z: 121 }
    ]
}
*/

export interface ICardBubble {
    title: string;
    series: ISeries
}

export default class ChartBubble {
    m_containerId: string;  
    m_chart: Chart | null = null;

    m_series: ISeries = [{name: '', data: []}];
/*
    m_title: string = "";
    m_color: string = "#7cb5ec";
    m_units: string = "";
    m_details: boolean = false;
*/
    constructor(p_containerId: string){
        this.m_containerId = p_containerId;
    }
/*
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
*/
    get series(): ISeries{
        return this.m_series
    }

    set series( p_series: ISeries){
        this.m_series = p_series;

        const _length: number = this.m_chart?.series.length || 0;
        Array.from({ length: _length }).forEach( () => { this.m_chart?.series[0]?.remove(true); } )
        
//      for(const _series in p_series) {
//            this.m_chart?.addSeries(_series as SeriesOptionsType);
//          console.log('_series:', _series)
//      }
/*
        p_series.forEach( (_series : ISeries) => {
            this.m_chart?.addSeries(_series as SeriesOptionsType);
        })
*/
    }
    

    createChart() : void {
        const option = {
            chart: {
                renderTo: this.m_containerId,
                backgroundColor: 'transparent',
                type: 'bubble', //TODO: packedbubble?? https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/packed-bubble
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
                bubbleLegend: {
                    enabled: true,
                    borderWidth: 1,
                    connectorDistance: 40,
                    maxSize: 70,
                    ranges: [{}, {}, { color: '#e4d354' }]
                }
            },
        
            plotOptions: {
                series: {
                    maxSize: 70
                }
            },
            series: this.m_series as SeriesOptionsType[]
            /*
            series: [{
                name: 'test1',
                data: [
                    { x: 95, y: 95, z: 834 },
                    { x: 86.5, y: 102.9, z: 1000 },
                    { x: 80.8, y: 91.5, z: 242 },
                    { x: 80.4, y: 102.5, z: 121 }
                ]
            } , {
                name: 'test2',
                data: [
                    { x: 80.3, y: 86.1, z: 358 },
                    { x: 78.4, y: 70.1, z: 450 },
                    { x: 74.2, y: 68.5, z: 598 }
                ]
            } , {
                name: 'test3',
                data: [
                    { x: 73.5, y: 83.1, z: 678 },
                    { x: 71, y: 93.2, z: 314 },
                    { x: 69.2, y: 57.6, z: 415 },
                    { x: 68.6, y: 20, z: 799 }
                ]
            }] as SeriesOptionsType[]*/
        }
        this.m_chart = new Highcharts.Chart(option as Options);
    }
}