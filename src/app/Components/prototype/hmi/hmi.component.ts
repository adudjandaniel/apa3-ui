import { Component, Input, Output, EventEmitter, OnInit, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { HmiStep } from 'src/app/Models/hmi-step';

@Component({
  selector: 'app-prototype-hmi',
  templateUrl: './hmi.component.html',
  styleUrls: ['./hmi.component.css']
})
export class HmiComponent implements OnInit, OnChanges {
  @Output() awaitState: EventEmitter<HmiStep>;
  @Input() animationState: string;

  currentScenario: string;
  currentStep: string;
  parkingType: string;
  selectedSpot: string;
  interruption: string;

  constructor() {
    this.awaitState = new EventEmitter<HmiStep>();
    this.interruption = '';
  }

  ngOnInit(): void {
    this.selectScenario();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propertyName in changes) {
      if (propertyName === 'animationState') {
        this.onAnimationChange(changes[propertyName]);
      }
    }
  }

  onAnimationChange(change: SimpleChange) {
    switch (this.animationState) {
      case 'start-apa-complete': {
        break;
      }
      case 'initialize-parking-style-complete': {
        this.showSpot();
        break;
      }
      case 'parking-complete': {
        this.parkSuccess();
        break;
      }
      case 'cyber-interruption': {
        this.interruption = 'Cyber Attack';
        this.parkSuccess();
        break;
      }
      case 'obstacle-interruption': {
        this.interruption = 'Obstacle';
        this.parkSuccess();
        break;
      }
      case 'sensor-interruption': {
        this.interruption = 'Sensor Failure';
        this.parkSuccess();
        break;
      }
    }
  }

  selectScenario(): void {
    this.currentStep = 'select-scenario';
    this.awaitState.emit({name: 'restart', value: undefined});
  }

  startAPA(scenario: string): void {
    this.currentScenario = scenario;
    this.currentStep = 'start-apa';
    this.awaitState.emit({name: this.currentStep, value: this.currentScenario});
  }

  selectStyle(): void {
    this.currentStep = 'choose-parking-style';
  }

  initiatializeParkingStyle(style: string): void {
    this.currentStep = 'awaiting';
    this.parkingType = style;
    this.awaitState.emit({name: 'initialize-parking-style', value: style});
  }

  showSpot(): void {
    if (this.currentScenario === 'no-spots-scenario') {
      this.currentStep = 'no-spot';
      return;
    }
    this.currentStep = 'select-spot';
  }

  selectExecutionLocation(spot: string): void {
    this.selectedSpot = spot;
    this.awaitState.emit({name: 'spot-selected', value: this.selectedSpot});
    this.currentStep = 'select-execution-location';
  }

  beginParking(): void {
    this.currentStep = 'begin-parking';
  }

  initiateParkingProcedure(): void {
    this.currentStep = 'awaiting';
    this.awaitState.emit({name: 'parking', value: this.selectedSpot});
  }

  parkSuccess(): void {
    if (this.currentScenario === 'interrupted-park-scenario') {
      this.currentStep = 'not-safe';
      return;
    }
    this.currentStep = 'parking-successful';
  }

  cancelPark(): void {
    this.awaitState.emit({name: 'restart', value: undefined});
    this.selectScenario();
  }

}
