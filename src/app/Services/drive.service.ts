import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { BaseFileModel } from '../Models/base-file-model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:5001';
  }

  getAllFiles(): Observable<Array<BaseFileModel>> {
    return this.http.get<Array<BaseFileModel>>(`${this.baseUrl}/drive`);
  }
}
