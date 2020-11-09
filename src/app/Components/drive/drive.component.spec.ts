import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { DriveService } from 'src/app/Services/drive.service';

import { DriveComponent } from './drive.component';

describe('DriveComponent', () => {
  let component: DriveComponent;
  let fixture: ComponentFixture<DriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
