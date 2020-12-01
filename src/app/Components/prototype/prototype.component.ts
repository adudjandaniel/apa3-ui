import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HmiStep } from 'src/app/Models/hmi-step';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {
  animationState: string;
  scenario: string;
  parkingType: string;
  spot: string;

  constructor() {
    this.restart();
  }

  ngOnInit(): void {
  }

  restart() {
    this.scenario = '';
    this.animationState = 'inactive';
    this.parkingType = '';
    this.spot = '';
  }

  handleHmiState(step: HmiStep): void {
    const completeTag = '-complete';

    switch (step.name) {
      case 'start-apa': {
        this.scenario = step.value;
        break;
      }
      case 'initialize-parking-style': {
        this.parkingType = step.value;
        // this.animationState = step.name + completeTag;
        break;
      }
      case 'parking': {
        this.animationState = step.name + completeTag;
        break;
      }
      case 'restart': {
        this.restart();
        break;
      }
    }
  }

  parkVehicle(spot: string): void {
  }

  animationStatusUpdate(status: string): void {
  }
}
