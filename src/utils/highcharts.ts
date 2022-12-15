import Highcharts, {Options} from 'highcharts';
import { Chart } from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);


export function create_highchart(label: string ,title: string, ylabel: string) {
    console.log('functionnnn!')
    const option = {
        chart: {
            renderTo: label,
            zoomType: undefined,
            defaultSeriesType: 'line',
                events: {}
                },
        
        title: {
            text: title
                },
        
        xAxis: {
                type:'datetime',
                
                title: {
                        text: 'Timestamp'
                        },
                categories: []
                },
        
        yAxis: {
            title: {
                text: ylabel
                    },
                    min: 0.0

                },
        
            series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                    type: "line"
                }, {
                    name: 'Manufacturing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Sales & Distribution',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
                    type: "line"
                }, {
                    name: 'Project Development',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
                    type: "line"
                }, {
                    name: 'Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                    type: "line"
                }],
        
    };    //   variable 'option' finished here

               
    // set the click event for the parent chart
    option.chart.renderTo = label;
    
    const labelChart: Chart = new Highcharts.Chart(option as Options);
           
               // alert(ylabel);
} 
