import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-prototype-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    for (const propertyName of Object.keys(changes)) {
      if (propertyName === 'spot') {
        console.log('Prop changed', 'spot');
      }
      if (propertyName === 'parkingType') {
        console.log('Prop changed', 'parkingType');
      }
      if (propertyName === 'scenario') {
        console.log('Prop changed', 'scenario');
      }
    }
  }

}
