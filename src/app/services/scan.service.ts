import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Scan } from '../models/scan';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private apiUrl = '/api/scans';
  private scansSource = new BehaviorSubject<Scan[]>([]);
  private _scans$ = this.scansSource.asObservable();

  public constructor(private http: HttpClient) {}

  //public getScans(): Observable<Scan[]> {
  //  return this.http.get<Scan[]>(this.apiUrl);
  //}

  public get scans$(): Observable<Scan[]> {
    return this._scans$;
  }

  public setScans(scans: Scan[]): void {
    this.scansSource.next(scans);
  }

  public uploadDicomFiles(files: FileList): Observable<Scan[]> {
    const formData = new FormData();
    Array.from(files).forEach((file: File) =>
      formData.append('files', file, file.name),
    );
    return this.http.post<Scan[]>(this.apiUrl, formData);
  }

  public deleteScan(id: number): Observable<object> {
    return this.http.delete(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }
}
