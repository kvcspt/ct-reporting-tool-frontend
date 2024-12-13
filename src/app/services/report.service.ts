import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scan } from '../models/scan';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = '/api/reports';

  public constructor(private http: HttpClient) {}

  public generateReport(templateId: number, scan: Scan): Observable<Report> {
    return this.http.post<Report>(
      `${this.apiUrl}/template/${templateId}`,
      scan,
    );
  }

  public saveAsPDF(report: Report): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/pdf`, report, {
      responseType: 'blob',
    });
  }

  public saveAsHTML(report: Report): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/html`, report, {
      responseType: 'blob',
    });
  }

  public saveAsJson(report: Report): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/json`, report, {
      responseType: 'blob',
    });
  }

  public saveAsFHIRJson(report: Report): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/fhir-json`, report, {
      responseType: 'blob',
    });
  }

  public uploadToFHIRCast(report: Report): Observable<object> {
    return this.http.post(`${this.apiUrl}/fhircast`, report);
  }
}
