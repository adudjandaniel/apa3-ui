import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BaseFileModel } from 'src/app/Models/base-file-model';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  menuHidden: boolean;
  currentFileUrl: SafeResourceUrl;
  files: Array<BaseFileModel>;

  constructor(private driveService: DriveService, private sanitizer: DomSanitizer) {
    this.driveService.getAllFiles()
      .subscribe((data: Array<BaseFileModel>) => {
        this.files = data;
      });
  }

  ngOnInit(): void {
    this.menuHidden = false;
  }

  toggleMenuDisplay(): void {
    this.menuHidden = !this.menuHidden;
  }

  openFile(fileUrl: string) {
    this.currentFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    console.log(this.currentFileUrl);
  }

}
