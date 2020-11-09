import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { BaseFileModel } from '../Models/base-file-model';
import { environment } from 'src/environments/environment';
import { FileModel } from '../Models/file-model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.drive.baseUrl;
  }

  getAllFiles(): Observable<Array<BaseFileModel>> {
    return this.http.get<Array<BaseFileModel>>(`${this.baseUrl}/drive`);
  }

  getFile(id: string): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.baseUrl}/drive/files/${id}`);
  }
}
