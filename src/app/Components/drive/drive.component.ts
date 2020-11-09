import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFileModel } from 'src/app/Models/base-file-model';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  menuHidden: boolean;
  files: Array<BaseFileModel>;

  constructor(private router: Router, private route: ActivatedRoute, private driveService: DriveService) {
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

  openFile(fileId: string) {
    this.router.navigate([fileId], { relativeTo: this.route });
  }

}
