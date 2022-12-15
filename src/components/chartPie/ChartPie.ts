import { BottomSheet } from "quasar";
import Highcharts, {
  Options,
  Chart,
  PointOptionsType,
  PointOptionsObject,
  color,
} from "highcharts";
import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module
// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);

// http://jsfiddle.net/leninanzen/w5arfhpw/3/
// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/pie-semi-circle
// http://jsfiddle.net/HpdwR/

import { ICardSectionWrapper } from "@/components/cardSectionWrapper/ICardSectionWrapper";
import {IResPostsSentimentScore, PostsListTaken} from "@/services/interfaces/IDashboard";
import {getDateFormatted} from "@/utils/date";

export interface IBubbleData {
  [index: number]: {
    x: number;
    y: number;
    z: number;
  };
}

export interface IButtonToggle {
  label: string;
  value: string;
  selected: boolean;
}

// There are problems using this interface because not have the typical methods of an array (push, ...)
export interface IPieData {
  [index: number]: [string, number];
  //(number | string)[]
}

export interface ICardPie extends ICardSectionWrapper {
  title: string;
  toggles? : Array<IButtonToggle>;
  score: number;
  data: Array<number | [string, number | null] | null | PointOptionsObject | any>; //IPieData
}

export interface postsSentimental {
  post: string,
  shourtCode: string
}

export default class ChartPie {
  m_containerId: string;
  m_chart: Chart | null = null;

  m_data: Array<
    number | [string, number | null] | null | PointOptionsObject
  > | any
      = [];
  m_score: number = 0;

  constructor(p_containerId: string) {
    this.m_containerId = p_containerId;
  }

  get score(): number {
    return this.m_score;
  }

  set score(p_score: number) {
    this.m_score = p_score;
    this.m_chart?.setTitle({
      text: "Score: " + this.m_score,
      align: "center",
      verticalAlign: "middle",
      y: -5,
      floating: false,
    });
  }

  get data(): Array<
    number | [string, number | null] | null | PointOptionsObject | any
  >  {
    return this.m_data;
  }

  set data(
    p_data: Array<number | [string, number | null] | null | PointOptionsObject | any >
  ) {
    this.m_data = p_data;
    this.m_chart?.series[0].setData(p_data);
  }

  createChart(): void {
    const option = {
      chart: {
        renderTo: this.m_containerId,
        // type: 'pie',
      },
      title: {
        text: "Score: " + this.m_score,
        align: "center",
        verticalAlign: "middle",
        y: -5,
        floating: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        pointFormat:
          "- Posts {point.y} ({point.percentage:.1f}%)<br/> - Score: {point.score:.1f}",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
              fontWeight: "bold",
              color: "white",
            },
          },
          startAngle: 0,
          endAngle: 360,
          size: "100%",
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "90%",
          showInLegend: true,
          data: this.m_data,
          cursor: "pointer",
          events: {
            click: function(event: any) {
              //NOTE instagram route
              const instagramRoute:  string = "https://www.instagram.com/p/";
              const positiveListArray : Array<PostsListTaken> = Array.from(option.series[0].data[0].positiveList)
              const negativeListArray : Array<PostsListTaken> = Array.from(option.series[0].data[2].positiveList)
              const neutralListArray: Array<PostsListTaken> = Array.from(option.series[0].data[1].positiveList)

              //NOTE variables
              const sentiment: string = event.point.name;
              const neutralPosts: Array<PostsListTaken> = neutralListArray
              const negativePosts : Array<PostsListTaken> = negativeListArray
              const positivePosts: Array<PostsListTaken> =positiveListArray

              let listToShow: Array<PostsListTaken>   = [];
              let iconToShow: string = '';
              let clasesForSentiments: string = ''
              let tittleColor: string =''

              switch (sentiment.toUpperCase()) {
                case 'POSITIVO':
                case 'POSITIVE':
                  listToShow = positivePosts;
                  iconToShow = 'sentiment_very_satisfied';
                  clasesForSentiments = 'post-information-line-positive'
                  tittleColor = 'color: #21D59B'
                  break;
                case 'NEUTRO':
                case 'NEUTRAL':
                  listToShow = neutralPosts;
                  iconToShow = 'sentiment_neutral'
                  clasesForSentiments = 'post-information-line-neutral'
                  tittleColor = 'color: #FFC700'
                  break;
                case 'NEGATIVO':
                case 'NEGATIVE' :
                  listToShow = negativePosts;
                  iconToShow = 'sentiment_very_dissatisfied'
                  clasesForSentiments = 'post-information-line-negative'
                  tittleColor = 'color: #F99600'
                  break;
              }

              const listOfLabels: Array<{label: string, icon: string, classes: string,shortcode: any}> = listToShow.map((e) => {
                const stringDate: string | undefined= e.updatedAt != null ? getDateFormatted(new Date(e.updatedAt!*1000)) : getDateFormatted(new Date(e.takenAt!*1000))
                return {
                  label: "Post: "+e.text.substring(0,7)+"... " + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + "Date: " + stringDate,
                  icon: iconToShow,
                  shortcode: e.shortcode,
                  classes: clasesForSentiments
                }
              })
              BottomSheet.create({
                title:sentiment,
                style: tittleColor,
                grid: false,
                actions: listOfLabels,
              }) // @ts-ignore
                .onOk((action) => {
                  const shortcodeFounded = listToShow.find(e => e.shortcode == action.shortcode)
                  window.open(`${instagramRoute}${shortcodeFounded?.shortcode}/`);
                });
            },
          },
        },
      ],
    };
    this.m_chart = new Highcharts.Chart(option as Options);
  }
}
