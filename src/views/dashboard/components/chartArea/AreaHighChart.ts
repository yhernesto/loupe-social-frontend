import { hexToRgbA } from '../../../../utils/colors';

import Highcharts, {Options, Chart} from 'highcharts';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export interface ITimeSeries {
    time: number;
    value: number;
}
export interface ICardsArea {
    title: string,
    amount?: number,
    diffs: number,
    data: number[][],
    color: string,
    units: string,
    active: boolean,
    loading: boolean;
}

export default class AreaHighChart{
    m_containerId: string;
    m_chart: Chart | null = null;
    m_data: number[][] = [[]];
    m_title: string = "";
    m_color: string = "#7cb5ec";
    m_units: string = "";
    m_autoTrendColor: boolean = false;
    m_applyOffset: boolean = false;
    m_yOffset: number | undefined = undefined;

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

    get autoTrendColor(): boolean {
        return this.m_autoTrendColor;
    }

    set autoTrendColor(p_autoTrendColor: boolean){
        this.m_autoTrendColor = p_autoTrendColor;
    }

    get units(): string {
        return this.m_units;
    }

    set units(p_units: string){
        this.m_units = p_units;
    }

	get applyOffset(): boolean{
		return this.m_applyOffset;
	}
	set applyOffset(p_val: boolean){
		this.m_applyOffset = p_val;
		if (this.m_applyOffset){
			const m_max: number = Math.max(...this.m_data.map((point) => point[1]))
			const m_min: number = Math.min(...this.m_data.map((point) => point[1]))
			this.m_yOffset = m_min - ((m_max - m_min) * 0.1);
			this.m_chart?.yAxis[0].update({
				min: this.m_yOffset,
			})
		}
	}

    get data(): number[][]{
        return this.m_data
    }

    set data( p_data: number[][]){
        //console.log('Setting data in AreaHighChart!')
        this.m_data = p_data;
        this.m_chart?.series[0].setData(p_data)

		if (this.m_applyOffset){
			const m_max: number = Math.max(...this.m_data.map((point) => point[1]))
			const m_min: number = Math.min(...this.m_data.map((point) => point[1]))
			this.m_yOffset = m_min - ((m_max - m_min) * 0.1);
			this.m_chart?.yAxis[0].update({
				min: this.m_yOffset,
			})
		}
    }

    /*************
     * Methods
     ************/
    //https://stackoverflow.com/questions/41327185/highcharts-in-area-chart-how-to-use-gradient-color-for-multiple-series
    createChart() : void {
        const option = {
         
            colors: [this.m_autoTrendColor ? this.trendColor() : this.color],

            chart: {
                renderTo: this.m_containerId,
                backgroundColor: 'transparent',
                type: 'area',
                zoomType: 'x',
                //    set the font family for the chart. PT Serif is CB default for body text.
    
                style: {
                    fontFamily: 'PT Serif'
                }
            },
            rangeSelector: {
                selected: 1
            },
        
            // set the title of the chart (here no title)
    
            title: {
                text: '',
            },
        
            // turn off the highcharts credit
    
            credits: {
                enabled: false
            },

            tooltip: {
                formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
                    return `${this.series.name}: <b>${this.y.toLocaleString()}</b><br/>`
                },
                //pointFormat: '{series.name} <b>{point.y:,.0f} {this.m_units}</b><br/>',
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                },
               dateTimeLabelFormats:{
                   month: ['%B %Y', '%B', '-%B %Y'],
                   year: ['%Y', '%Y', '-%Y']
               },

                dataGrouping: {
                    enabled: true,
                    forced: true,
                    units: [
                        ['month', [1, 3, 6]]
                    ]
                },
                groupPixelWidth: 10
            },

            // options for the y axis
            yAxis: {
    
                // controls the order of series in a stacked column/area chart
    
                reversedStacks: false,
				min: this.m_yOffset,
                // sets the font size for the y axis labels
    
                labels: {
                    enabled: false,
                    style: {
                        fontSize: '12px'
                    },
    
                    // adds the suffix "Mt" to the values on the y axis
    
                    format: '{value:,.0f} {this.m_units}'
                },
    
                // set the title of the y axis
    
                title: {
                    text: ''
                }
            },
        
            // sets options for the x axis
    
            xAxis: {
                crosshair: {
                    width: 2,
                    color: '#E5E5E5'
                },
                labels: {
                    enabled: false,
                    style: {
                        fontSize: '12px'
                    }
                }
            },
        
            // sets options for the legend
    
            legend: {
    
                // turn the legend on or off
                enabled: false,
    
                // set the layout of the legend
    
                layout: 'horizontal',
                floating: false,
                verticalAlign: 'top',
    
                // you can fine-tune the legend position here
                // y: 30,
                x: 15,
    
                // set the font size of the legend
                // add "//" to use default settings
    
                //	        itemStyle: {
                //	          fontSize: '10px'
                //	        }
    
            },
        
            // pull the data from a google spreadsheet
            // you have to publish the spreadsheet to the web
            // then grab the code from the url
            // for example here, the bit after "d/" and before the final "/"
            // https://docs.google.com/spreadsheets/d/1NAzRluJxGjyrJqsI6kjtSYxcPXTIL-lQZ6chFDcx2XI/
    
            series: [{
                name: this.title,
                data: this.m_data, //[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                type: "area",
                fillColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, this.m_autoTrendColor ? this.trendColor() : this.color],
                        [1, hexToRgbA(this.m_autoTrendColor ? this.trendColor() : this.color, 0)]
                    ],
                }
            }],
            exporting: {
                enabled: false
            }
        };

        this.m_chart = new Highcharts.Chart(option as Options);
    }


    /*
    References:
        https://math.stackexchange.com/a/204021
        https://classroom.synonym.com/calculate-trendline-2709.html
    */
    trendSlope(): number{
        let a = 0, b = 0, c = 0, d = 0, slope = 0;
        let xSum = 0, ySum = 0, xySum = 0, xSquare = 0;
        const dpsLength = this.m_data.length;
        for(let i = 0; i < dpsLength; i++)
            xySum += (this.m_data[i][0] * this.m_data[i][1])
        
        a = xySum * dpsLength;
    
        for(let i = 0; i < dpsLength; i++){
            xSum += this.m_data[i][0];
            ySum += this.m_data[i][1];
        }
        b = xSum * ySum;
    
        for(let i = 0; i < dpsLength; i++)  	
            xSquare += Math.pow(this.m_data[i][0], 2);    
        c = dpsLength * xSquare;
    
        d = Math.pow(xSum, 2);
        slope = c==d ? 0 : (a-b)/(c-d);
        
        return slope
    }

    trendColor(): string {
        let m_trendColor: string = "#eceb7c";
        if ( this.trendSlope() * Math.pow(10,7) < -0.2)
            m_trendColor = "#ec7c7d";
        if ( this.trendSlope() * Math.pow(10,7) > 0.2)
            m_trendColor = "#7dec7c";
        
        return m_trendColor;
    }
}