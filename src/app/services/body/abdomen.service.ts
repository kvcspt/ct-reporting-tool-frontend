import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbdomenService {
  private apiUrl = '/api/body';

  public constructor(private http: HttpClient) {}

  public saveAsHTML(form: object): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/dynamic/html`, form, {
      responseType: 'blob',
    });
  }

  public saveAsPdf(form: object): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/dynamic/pdf`, form, {
      responseType: 'blob',
    });
  }
}
