import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'prototype-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  @Output() animationStatus: EventEmitter<string>;
  @Input() scenario: string;
  @Input() parkingType: string;
  @Input() spot: string;
  showSpots: boolean;

  constructor() { 
    this.animationStatus = new EventEmitter<string>();
    this.showSpots = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    for (const propertyName in changes) {
      if (propertyName === 'spot') {
        console.log("Prop changed", 'spot')
      }
      if (propertyName === 'parkingType') {
        console.log("Prop changed", 'parkingType')
      }
      if (propertyName === 'scenario') {
        console.log("Prop changed", 'scenario')
      }
    }
  }

}
