import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {
  currentStep: string;

  constructor() { }

  ngOnInit(): void {
    this.startPark();
  }

  startPark(): void {
    this.currentStep = "start-parking";
  }

  selectStyle(): void {
    this.currentStep = "choose-parking-style";
  }

  showSpot(): void {
    this.currentStep = "select-spot";
  }

  selectExecutionLocation(): void {
    this.currentStep = "select-execution-location"
  }

  parkSuccess(): void {
    this.currentStep = "parking-successful";
  }

}
