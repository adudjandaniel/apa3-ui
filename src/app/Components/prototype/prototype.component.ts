import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {
  currentScenario: string;
  currentStep: string;

  constructor() { }

  ngOnInit(): void {
    this.selectScenario();
  }

  selectScenario(): void {
    this.currentStep = 'select-scenario';
  }

  startPark(scenario: string): void {
    this.currentScenario = scenario;
    this.currentStep = 'start-parking';
  }

  selectStyle(): void {
    this.currentStep = 'choose-parking-style';
  }

  showSpot(): void {
    if (this.currentScenario === 'no-spots-scenario') {
      this.currentStep = 'no-spot';
      return;
    }
    this.currentStep = 'select-spot';
  }

  selectExecutionLocation(): void {
    this.currentStep = 'select-execution-location';
  }

  parkSuccess(): void {
    if (this.currentScenario === 'interrupted-park-scenario') {
      this.currentStep = 'not-safe';
      return;
    }
    this.currentStep = 'parking-successful';
  }

  cancelPark(): void {
    this.selectScenario();
  }
}
