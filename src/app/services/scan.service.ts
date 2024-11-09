import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scan } from '../models/scan';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private apiUrl = '/api/scans';

  public constructor(private http: HttpClient) {}

  public getScans(): Observable<Scan[]> {
    return this.http.get<Scan[]>(this.apiUrl);
  }

  public uploadDicomFiles(files: FileList): Observable<object> {
    const formData = new FormData();
    Array.from(files).forEach((file) =>
      formData.append('files', file, file.name),
    );
    return this.http.post<object>(this.apiUrl, formData);
  }

  public deleteScan(id: number): Observable<object> {
    return this.http.delete(this.apiUrl + '/' + encodeURIComponent(id));
  }
}
