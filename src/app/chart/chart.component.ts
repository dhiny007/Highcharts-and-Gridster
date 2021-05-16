import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';

import {CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType} from 'angular-gridster2';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      defaultItemCols: 1,
      defaultItemRows: 1,
      setGridSize: true,
      fixedColWidth: 250,
      fixedRowHeight: 250,
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      }
    };

    this.dashboard = [
      {cols: 1, rows: 1, y: 0, x: 0, initCallback: this.initItem.bind(this)},

    ];
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
    // this.layout=this.finalCollection;
    // console.log('layout',this.layout);
  }


  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent): void {
    this.itemToPush = itemComponent;
  }

  pushItem(): void {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) { // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(this.itemToPush.$item, this.itemToPush.item);
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  getItemComponent(): void {
    if (this.options.api && this.options.api.getItemComponent) {
      console.log(this.options.api.getItemComponent(this.dashboard[0]));
    }
  }
}
