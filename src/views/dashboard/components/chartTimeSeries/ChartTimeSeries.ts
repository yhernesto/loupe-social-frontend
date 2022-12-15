import Highcharts, {Options, Chart, SeriesOptions, SeriesOptionsType, Point, XAxisOptions,Series, SeriesSplineOptions } from 'highcharts';
import { ICardSectionWrapper } from '@/components/cardSectionWrapper/ICardSectionWrapper'
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export interface ISeries {
    name: string;
    data: number[][]
    xAxis?: XAxisOptions
}

export interface IDateRange {
    from: Date;
    to: Date;
}

export interface ICardTimeSeries extends ICardSectionWrapper{
    title: string;
    series: Array<SeriesSplineOptions>,
    xAxis?: IDateRange;
    xAxisPrv?: IDateRange;
}

export default class ChartTimeSeries{
    m_containerId: string;
    m_chart: Chart | null = null;
    m_series: Array<SeriesSplineOptions> = [{ type: 'spline',  name: '', data: [] }];
    m_title: string = "";
    m_color: string = "#7cb5ec";
    m_units: string = "";
    m_details: boolean = false;
    m_renderDateRange: IDateRange | undefined = undefined;
    m_renderPrvDateRange: IDateRange | undefined = undefined;

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

    get units(): string {
        return this.m_units;
    }

    set units(p_units: string){
        this.m_units = p_units;
    }

    get renderDateRange(): IDateRange | undefined {
        return this.m_renderDateRange;
    }
    set renderDateRange(p_renderDateRange: IDateRange | undefined){
        this.m_renderDateRange = p_renderDateRange;
        this.m_chart?.xAxis[0].update({
            min: p_renderDateRange?.from.getTime(),
            max: p_renderDateRange?.to.getTime()
          })
    }
    
    get renderPrvDateRange(): IDateRange | undefined {
        return this.m_renderPrvDateRange;
    }
    set renderPrvDateRange(p_renderPrvDateRange: IDateRange | undefined){
        this.m_renderPrvDateRange = p_renderPrvDateRange;
        this.m_chart?.xAxis[1].update({
            min: p_renderPrvDateRange?.from.getTime(),
            max: p_renderPrvDateRange?.to.getTime()
        })
    }

    get series(): Array<SeriesSplineOptions>{
        return this.m_series
    }

    set series( p_series: Array<SeriesSplineOptions>){
        this.m_series = p_series;

        // console.log('p_series:', p_series[0].data)
        // const sortedSeries = p_series[0].data.sort((a: number[], b: number[]) => a.x > b.x ? 1 : -1)
        // console.log('p_series:', sortedSeries)
        // console.log('p_seriesFirst:', sortedSeries[0] ? sortedSeries[0] : sortedSeries)
        // console.log('p_seriesLast:', sortedSeries[p_series[0].data.length - 1] ? sortedSeries[p_series[0].data.length - 1][0] : sortedSeries[p_series[0].data.length - 1])

        const _length: number = this.m_chart?.series.length || 0;
        Array.from({ length: _length }).forEach( () => { this.m_chart?.series[0]?.remove(true); } )

        p_series.forEach( (_series : SeriesSplineOptions) => {
            this.m_chart?.addSeries(_series as SeriesOptionsType);
        })
    }

    createChart() : void {
        const option = {
            chart: {
                renderTo: this.m_containerId,
                backgroundColor: 'transparent',
                type: 'spline',
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
            xAxis: [{
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        showFirstLabel: true,
                        units:[
                            [
                                'day',
                                [1, 2]
                            ], [
                                'week',
                                [1, 2]
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ], [
                                'year',
                                null
                            ]
                        ],
                        title: {
                            text: 'Current'
                        },
                        // tickInterval: 30 * 24 * 3600 * 1000,
                        // min: new Date(2021,3,1).getTime(), //this.m_renderDateRange?.from.getTime(),
                        // max: new Date(2021,5,1).getTime(), //this.m_renderDateRange?.to.getTime(),
                        min: this.m_renderDateRange?.from.getTime(),
                        max: this.m_renderDateRange?.to.getTime(),
                    }, {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        units:[
                            [
                                'day',
                                [1, 2]
                            ], [
                                'week',
                                [1, 2]
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ], [
                                'year',
                                null]
                        ],
                        title: {
                            text: 'Previous'
                        },
                        visible: false,
                        // tickInterval: 30 * 24 * 3600 * 1000,
                        min: this.m_renderPrvDateRange?.from.getTime(),
                        max: this.m_renderPrvDateRange?.to.getTime(),
            }],

            yAxis: {
                title: {
                    text: ''
                },
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
            },
        
            plotOptions: {
                series: {
                    marker: {
                        enabled: true
                    }
                }
            },
        
            colors: ['#6CF', '#fcc572', '#06C', '#036', '#000'],
        
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            series: this.m_series,
            exporting: {
                enabled: false
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        plotOptions: {
                            series: {
                                marker: {
                                    radius: 2.5
                                }
                            }
                        }
                    }
                }]
            }
        
        }
        this.m_chart = new Highcharts.Chart(option as Options);
    }
}