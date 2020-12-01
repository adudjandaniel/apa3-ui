import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-prototype-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('prepParallelPark', [
      state('parallel-park-start', style({
        top: '100%'
      })),
      state('parallel-park-before-parking', style({
        top: '40%'
      })),
      transition('parallel-park-start => parallel-park-before-parking', [
        animate('3s')
      ])
    ]),
    trigger('prepPerpendicularPark', [
      state('perpendicular-park-start', style({
        top: '100%'
      })),
      state('perpendicular-park-before-parking', style({
        top: '35%'
      })),
      transition('perpendicular-park-start => perpendicular-park-before-parking', [
        animate('3s')
      ])
    ]),
    trigger('completeParallelPark', [
      state('parallel-park-before-parking', style({

      })),
      state('parallel-park-final', style({

      })),
      transition('parallel-park-before-parking => parallel-park-final', [
        animate('3s')
      ])
    ]),
    trigger('completePerpendicularParkA', [
      state('perpendicular-park-before-parking', style({

      })),
      state('perpendicular-park-final-A', style({

      })),
      transition('perpendicular-park-before-parking => perpendicular-park-final-A', [
        animate('3s')
      ])
    ]),
    trigger('completePerpendicularParkB', [
      state('perpendicular-park-before-parking', style({

      })),
      state('perpendicular-park-final-B', style({

      })),
      transition('perpendicular-park-before-parking => perpendicular-park-final-B', [
        animate('3s')
      ])
    ])
  ]
})
export class AnimationComponent implements OnInit, OnChanges {
  @Output() animationStatus: EventEmitter<boolean>;
  @Input() scenario: string;
  @Input() parkingType: string;
  @Input() spot: string;
  showSpots: boolean;

  constructor() {
    this.animationStatus = new EventEmitter<boolean>();
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

  prepParkDone(event: AnimationEvent): void {
    this.animationStatus.emit(true);
  }
}