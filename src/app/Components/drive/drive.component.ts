import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  menuHidden: boolean;

  constructor() { }

  ngOnInit(): void {
    this.menuHidden = true
  }

  toggleMenuDisplay() : void {
    this.menuHidden = !this.menuHidden;
  }

}
