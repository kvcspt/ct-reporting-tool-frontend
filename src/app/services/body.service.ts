import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyTemplate } from '../models/template';
import { Observable } from 'rxjs';
import { Scan } from '../models/scan';

@Injectable({
  providedIn: 'root',
})
export class BodyService {
  private apiUrl = '/api/body';

  public constructor(private http: HttpClient) {}

  public createBodyTemplate(data: BodyTemplate): Observable<BodyTemplate> {
    return this.http.post<BodyTemplate>(`${this.apiUrl}/save`, data);
  }

  public getBodyTemplates(): Observable<BodyTemplate[]> {
    return this.http.get<BodyTemplate[]>(`${this.apiUrl}/templates`);
  }

  public updateBodyTemplate(
    bodyTemplate: BodyTemplate,
  ): Observable<BodyTemplate> {
    return this.http.put<BodyTemplate>(
      `${this.apiUrl}/templates`,
      bodyTemplate,
    );
  }

  public deleteBodyTemplate(title: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/templates/${encodeURIComponent(title)}`,
    );
  }

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

  public saveDicomSr(
    title: string,
    scan: Scan,
    form: object,
  ): Observable<Blob> {
    const body = { title, scan, form };
    return this.http.post(`${this.apiUrl}/dicomsr`, body, {
      responseType: 'blob',
    });
  }
}
