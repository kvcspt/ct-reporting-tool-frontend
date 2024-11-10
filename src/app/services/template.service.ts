import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private apiUrl = '/api/report-templates';

  public constructor(private http: HttpClient) {}

  public getTemplateById(id: number): Observable<Template> {
    return this.http.get<Template>(`${this.apiUrl}/${id}`);
  }

  public getAllTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.apiUrl}`);
  }

  public updateTemplate(template: Template): Observable<Template> {
    return this.http.put<Template>(`${this.apiUrl}/${template.id}`, template);
  }

  public createTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(this.apiUrl, template);
  }

  public deleteTemplate(template: Template): Observable<Template> {
    return this.http.delete<Template>(`${this.apiUrl}/${template.id}`);
  }
}
