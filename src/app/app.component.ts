import { Component, OnInit } from '@angular/core';
import { CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType } from 'angular-gridster2';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dropdownArray;
  selectedValue:number;
  options:GridsterConfig;
  //layout:GridsterItem[]=[];
  layout:Array<GridsterItem>;
  itemToPush:GridsterItemComponent;
  highChartsOptions: Highcharts.Options;

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit(){
    this.dropdownArray=[1,2,3,4];
    this.selectedValue=1;
    this.options = {
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize
    };

  }

  finalCollection=[];

  // pushCharts(){
  //   this.finalCollection=[];
  //   for(let i=0;i<this.selectedValue;i++){
  //       this.finalCollection.push(this.chartCollection[i]);
  //   }
  //   console.log('hehehe',this.finalCollection);
  //   this.layout=this.finalCollection;
  //   console.log('layout',this.layout);
  // }

//   public resizeChart(): void {
//     console.log("resizeChart");
//     this.highChartsOptions.chart.height = this.item.rows * (this.unitHeight - 10) + ((this.item.rows - 4) * 10);
//     this.highChartsOptions.chart.width = this.item.cols * (this.unitHeight - 10) + ((this.item.cols - 4) * 10);

//   if (this.chart.ref) {
//       this.chart.ref.setSize(this.highChartsOptions.chart.width, this.highChartsOptions.chart.height, false);
//   }
// }

}
