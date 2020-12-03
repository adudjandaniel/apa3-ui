import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
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

    trigger('interruptedParallelParkObstacle', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '43%',
        top: '40%',
        transform: 'rotate(70deg)'
      })),
      transition('before-parking => park-final', [
        animate('5s', keyframes([
          style({top: '20%', offset: 0.25}),
          style({top: '20%', offset: 0.28}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.7}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.72}),
          style({top: '40%', transform: 'rotate(70deg)', left: '43%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle1700', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '42%',
        top: '40%',
        transform: 'rotate(60deg)'
      })),
      transition('before-parking => park-final', [
        animate('5s', keyframes([
          style({top: '20%', offset: 0.25}),
          style({top: '20%', offset: 0.28}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.7}),
          style({top: '35%', transform: 'rotate(45deg)', left: '40%', offset: 0.72}),
          style({top: '40%', transform: 'rotate(60deg)', left: '42%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle1400', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '36%',
        top: '25%',
        transform: 'rotate(70deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s', keyframes([
          style({top: '20%', offset: 0.5}),
          style({top: '20%', offset: 0.6}),
          style({top: '25%', transform: 'rotate(70deg)', left: '36%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle1200', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '34%',
        top: '23%',
        transform: 'rotate(70deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s', keyframes([
          style({top: '20%', offset: 0.6}),
          style({top: '20%', offset: 0.7}),
          style({top: '23%', transform: 'rotate(70deg)', left: '34%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle850', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '31.5%',
        top: '23%',
        transform: 'rotate(70deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s', keyframes([
          style({top: '20%', offset: 0.6}),
          style({top: '20%', offset: 0.7}),
          style({top: '23%', transform: 'rotate(70deg)', left: '31.5%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle650', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '22%',
        top: '25%',
        transform: 'rotate(70deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s', keyframes([
          style({top: '20%', offset: 0.5}),
          style({top: '20%', offset: 0.6}),
          style({top: '25%', transform: 'rotate(70deg)', left: '22%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedParallelParkObstacle350', [
      state('before-parking', style({
        top: '40%'
      })),
      state('park-final', style({
        left: '37%',
        top: '38%',
        transform: 'rotate(68deg)'
      })),
      transition('before-parking => park-final', [
        animate('5s', keyframes([
          style({top: '20%', offset: 0.3}),
          style({top: '20%', offset: 0.35}),
          style({top: '35%', transform: 'rotate(45deg)', left: '35%', offset: 0.7}),
          style({top: '35%', transform: 'rotate(45deg)', left: '35%', offset: 0.75}),
          style({top: '38%', transform: 'rotate(68deg)', left: '37%', offset: 0.9}),
          style({top: '38%', transform: 'rotate(68deg)', left: '37%', offset: 1})
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

    trigger('completePerpendicularParkA1400', [
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
          style({top: '37%', transform: 'rotate(155deg)', left: '48%', offset: 0.65}),
          style({top: '35%', transform: 'rotate(180deg)', left: '55%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '35%',
        left: '50%',
        transform: 'rotate(175deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s', keyframes([
          style({top: '38%', transform: 'rotate(150deg)', left: '45%', offset: 0.6}),
          style({top: '35%', transform: 'rotate(175deg)', left: '50%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle1700', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '37%',
        left: '47%',
        transform: 'rotate(165deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s', keyframes([
          style({top: '40%', transform: 'rotate(140deg)', left: '43%', offset: 0.6}),
          style({top: '37%', transform: 'rotate(165deg)', left: '47%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle1400', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '37%',
        left: '45%',
        transform: 'rotate(160deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s', keyframes([
          style({top: '40%', transform: 'rotate(130deg)', left: '42%', offset: 0.6}),
          style({top: '37%', transform: 'rotate(160deg)', left: '45%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle1200', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '37%',
        left: '39%',
        transform: 'rotate(160deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s', keyframes([
          style({top: '40%', transform: 'rotate(150deg)', left: '34%', offset: 0.7}),
          style({top: '37%', transform: 'rotate(160deg)', left: '39%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle850', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '38%',
        left: '34%',
        transform: 'rotate(160deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle650', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '38%',
        left: '28%',
        transform: 'rotate(160deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s')
      ])
    ]),

    trigger('interruptedPerpendicularParkAObstacle350', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '38%',
        left: '29%',
        transform: 'rotate(160deg)'
      })),
      transition('before-parking => park-final', [
        animate('3s', keyframes([
          style({top: '38%', transform: 'rotate(160deg)', left: '29%', offset: 1})
        ]))
      ])
    ]),

    trigger('completePerpendicularParkB', [
      state('perpendicular-park-before-parking', style({
        top: '50%'
      })),
      state('perpendicular-park-final-B', style({
        top: '65%',
        left: '55%',
        transform: 'rotate(0deg)'
      })),
      transition('perpendicular-park-before-parking => perpendicular-park-final-B', [
        animate('5s', keyframes([
          style({top: '65%', transform: 'rotate(5deg)', left: '45%', offset: 0.7}),
          style({top: '65%', transform: 'rotate(0deg)', left: '55%', offset: 1})
        ]))
      ])
    ]),

    trigger('completePerpendicularParkB1400', [
      state('perpendicular-park-before-parking', style({
        top: '50%'
      })),
      state('perpendicular-park-final-B', style({
        top: '65%',
        left: '55%',
        transform: 'rotate(0deg)'
      })),
      transition('perpendicular-park-before-parking => perpendicular-park-final-B', [
        animate('5s', keyframes([
          style({top: '65%', transform: 'rotate(7deg)', left: '45%', offset: 0.45}),
          style({top: '65%', transform: 'rotate(0deg)', left: '55%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '49%',
        transform: 'rotate(0deg)'
      })),
      transition('before-parking => park-final', [
        animate('5s', keyframes([
          style({top: '65%', transform: 'rotate(5deg)', left: '45%', offset: 0.6}),
          style({top: '65%', transform: 'rotate(0deg)', left: '49%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle1700', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '46.7%',
        transform: 'rotate(0deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s', keyframes([
          style({top: '65%', transform: 'rotate(5deg)', left: '45%', offset: 0.7}),
          style({top: '65%', transform: 'rotate(0deg)', left: '46.7%', offset: 1})
        ]))
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle1400', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '45%',
        transform: 'rotate(5deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle1200', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '40%',
        transform: 'rotate(5deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle850', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '33%',
        transform: 'rotate(5deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle650', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '25%',
        transform: 'rotate(2deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('interruptedPerpendicularParkBObstacle350', [
      state('before-parking', style({
        top: '50%'
      })),
      state('park-final', style({
        top: '65%',
        left: '27%',
        transform: 'rotate(2deg)'
      })),
      transition('before-parking => park-final', [
        animate('4s')
      ])
    ]),

    trigger('resetParkingVehicleRotation', [
      state('before', style({
      })),
      state('after', style({
        left: 'none',
        transform: 'rotate(90deg)'
      })),
      transition('before => after', [
        animate('0s')
      ])
    ]),

    trigger('interruptedParkNonObstacle', [
      state('before-parking', style({

      })),
      state('park-final', style({

      })),
      transition('before-parking => park-final', [
        animate('3s')
      ])
    ])
  ]
})
export class AnimationComponent implements OnInit, OnChanges {
  @Output() animationStatus: EventEmitter<boolean>;
  @Output() interruptionState: EventEmitter<string>;
  @Input() scenario: string;
  @Input() parkingType: string;
  @Input() spot: string;
  @Input() park: boolean;
  @Input() resetAnimation: boolean;
  screenMaxWidth: string;
  showSpots: boolean;
  interruption: string;
  hideInterruptionSet: boolean;
  showObstacle: boolean;

  constructor() {
    this.animationStatus = new EventEmitter<boolean>();
    this.interruptionState = new EventEmitter<string>();
    this.reset();
  }

  ngOnInit(): void {
    this.setScreenWidth();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propertyName of Object.keys(changes)) {
      if (propertyName === 'park') {
        if (this.park === true) {
          this.hideInterruptionSet = false;
        }
      }
      if (propertyName === 'resetAnimation') {
        if (this.resetAnimation) {
          this.reset();
        }
      }
    }
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
    this.setScreenWidth();
  }

  setScreenWidth() {
    const width = document.body.clientWidth;

    if (width <= 350) {
      this.screenMaxWidth = '350px';
    } else if (width <= 650) {
      this.screenMaxWidth = '650px';
    } else if (width <= 850) {
      this.screenMaxWidth = '850px';
    } else if (width <= 1200) {
      this.screenMaxWidth = '1200px';
    } else if (width <= 1400) {
      this.screenMaxWidth = '1400px';
    } else if (width <= 1700) {
      this.screenMaxWidth = '1700px';
    } else {
      this.screenMaxWidth = '>1700px';
    }
  }

  reset(ignoreObstacle: boolean = false) {
    this.interruption = '';
    this.showSpots = false;
    this.hideInterruptionSet = true;
    if (!ignoreObstacle) {
      this.showObstacle = false;
    }
  }

  prepParkDone(event: AnimationEvent): void {
    this.showSpots = !(this.scenario === 'no-spots-scenario' || this.scenario === '');
    this.animationStatus.emit(true);
  }

  parkDone(event: AnimationEvent): void {
    this.reset();
    this.animationStatus.emit(true);
  }

  interruptedParkDone(event: AnimationEvent): void {
    this.interruptionState.emit(this.interruption);
    this.reset(true);
  }

  setInterruption(interruption: string) {
    this.interruption = interruption;
    this.hideInterruptionSet = true;
    if (interruption === 'obstacle') {
      this.showObstacle = true;
    }
  }
}
