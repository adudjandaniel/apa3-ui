import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from 'src/app/Models/file-model';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  fileUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private driveService: DriveService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var fileId = params['id'];
      if (fileId) {
        this.driveService.getFile(fileId).subscribe((file: FileModel) => {
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.embedLink);
          console.log(this.fileUrl);
        });
      }
    });
  }

}
