import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyTemplate } from '../../models/template';
import { Observable } from 'rxjs';

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
}
