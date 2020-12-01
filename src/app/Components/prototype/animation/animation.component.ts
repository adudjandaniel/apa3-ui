import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-prototype-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('prepParallelPark', [
      state('parallel-park-start', style({
        top: '40%'
      })),
      state('parallel-park-before-parking', style({
        top: '40%'
      })),
      transition('parallel-park-start => parallel-park-before-parking', [
        animate('2s')
      ])
    ]),

    trigger('prepPerpendicularPark', [
      state('perpendicular-park-start', style({
        top: '50%'
      })),
      state('perpendicular-park-before-parking', style({
        top: '50%'
      })),
      transition('perpendicular-park-start => perpendicular-park-before-parking', [
        animate('2s')
      ])
    ]),

    trigger('prepPerpendicularParkNoSpots', [
      state('perpendicular-park-start-no-spots', style({
        top: '30%'
      })),
      state('perpendicular-park-before-parking-no-spots', style({
        top: '30%'
      })),
      transition('perpendicular-park-start-no-spots => perpendicular-park-before-parking-no-spots', [
        animate('2s')
      ])
    ]),

    trigger('completeParallelPark', [
      state('parallel-park-before-parking', style({
        top: '40%'
      })),
      state('parallel-park-final', style({
        left: '45%',
        top: '40%'
      })),
      transition('parallel-park-before-parking => parallel-park-final', [
        animate('5s', keyframes([
          style({top: '20%', offset: 0.25}),
          style({top: '20%', offset: 0.28}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.7}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.71}),
          style({top: '40%', transform: 'rotate(90deg)', left: '45%', offset: 1})
        ]))
      ])
    ]),

    trigger('completePerpendicularParkA', [
      state('perpendicular-park-before-parking', style({
        top: '50%'
      })),
      state('perpendicular-park-final-A', style({
        top: '35%',
        left: '55%',
        transform: 'rotate(180deg)'
      })),
      transition('perpendicular-park-before-parking => perpendicular-park-final-A', [
        animate('5s', keyframes([
          style({top: '38%', transform: 'rotate(155deg)', left: '43%', offset: 0.55}),
          style({top: '35%', transform: 'rotate(180deg)', left: '55%', offset: 1})
        ]))
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
  @Input() park: boolean;
  showSpots: boolean;

  constructor() {
    this.animationStatus = new EventEmitter<boolean>();
    this.showSpots = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  prepParkDone(event: AnimationEvent): void {
    this.showSpots = !(this.scenario === 'no-spots-scenario' || this.scenario === '');
    this.animationStatus.emit(true);
  }

  parkDone(event: AnimationEvent): void {
    this.showSpots = false;
    this.animationStatus.emit(true);
  }
}
