import { Component, Input, OnInit} from '@angular/core';

import {CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridType} from 'angular-gridster2';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() selectedVal:number;
  options: GridsterConfig;
  dashboard: GridsterItem[];
  itemToPush: GridsterItemComponent;
  chart:Chart;
  finalCollection;

  ngOnInit(): void {
    this.selectedVal=1;
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      maxCols: 2,
      minCols:1,
      minRows: 1,
      maxRows: 2,
      maxItemCols: 2,
      minItemCols: 1,
      maxItemRows: 2,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      fixedRowHeight:400,
      keepFixedHeightInMobile:true,
      defaultItemCols: 1,
      defaultItemRows: 1,
      setGridSize: true,
      swap:true,
      swapWhileDragging:false,
      pushItems: false,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      }
    };
  }

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    legend:{
      align:'center',
      verticalAlign:'middle'
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
    for(let i=0;i<this.selectedVal;i++){
        this.finalCollection.push(this.chartCollection[i]);
    }
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

}
