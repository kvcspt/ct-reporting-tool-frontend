import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Scan} from "../models/scan";

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private apiUrl = '/api/scans'; // Adjust to your API URL

  constructor(private http: HttpClient) {}

  getScans(): Observable<Scan[]> {
    return this.http.get<Scan[]>(this.apiUrl);
  }

  uploadDicomFiles(files: FileList): Observable<any> {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file, file.name));
    return this.http.post(this.apiUrl, formData);
  }
}
