import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dropdownArray;
  selectedValue:number;

  ngOnInit(){
    this.dropdownArray=[1,2,3,4];
    this.selectedValue=1;
  }

}
