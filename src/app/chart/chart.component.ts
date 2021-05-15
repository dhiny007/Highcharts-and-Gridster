import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit,OnChanges {

  @Input() selectedVal:number;
  options:GridsterConfig;
  layout:Array<GridsterItem>;
  chart:Chart;
  finalCollection;

  constructor() { }

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit(): void {
    this.options = {
      itemChangeCallback: ChartComponent.itemChange,
      itemResizeCallback: ChartComponent.itemResize
    };
  }

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        type:'line',
        data: [1, 2, 3]
      }
    ]
  });

  barChart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Bar Chart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
      name: 'Bar 1',
      type:'bar',
      data: [1, 2, 3, 4, 3.5]
      }
    ]
    });

  pieChart = new Chart({
    chart:{
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares in October, 2019'
    },
    credits:{
      enabled:false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      type: undefined,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }]
    }]
  })

  areaSplineChart=new Chart({
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Average fruit consumption during one week'
      },
      subtitle : {
         style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
      }
      },
      legend : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
      },
      xAxis:{
         categories: ['Monday','Tuesday','Wednesday','Thursday',
            'Friday','Saturday','Sunday']
      },
      yAxis : {
         title: {
            text: 'Number of units'
         }
      },
      tooltip : {
        shared: true, valueSuffix: ' units'
     },
     plotOptions : {
        area: {
           fillOpacity: 0.5
        }
     },
     credits:{
       enabled: false
     },
     series: [
      {
         name: 'John',
         type:'areaspline',
         data: [3, 4, 3, 5, 4, 10, 12]
      },
      {
         name: 'Jane',
         type:'areaspline',
         data: [1, 3, 4, 3, 3, 5, 4]
      }
   ]
  });

  chartCollection=[this.lineChart,this.barChart,this.pieChart,this.areaSplineChart];

  ngOnChanges(){
    this.finalCollection=[];
    console.log('val',this.selectedVal);
    for(let i=0;i<this.selectedVal;i++){
        this.finalCollection.push(this.chartCollection[i]);
    }
    console.log('hehehe',this.finalCollection);
    this.layout=this.finalCollection;
    console.log('layout',this.layout);
  }

}
