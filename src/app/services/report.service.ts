import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scan } from '../models/scan';
import { Observable } from 'rxjs';
import { BodyReport, Report } from '../models/report';

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

  public saveAsFHIRJson(report: Report, form: BodyReport[]): Observable<Blob> {
    const body = { report, form };
    return this.http.post(`${this.apiUrl}/fhir-json`, body, {
      responseType: 'blob',
    });
  }

  public uploadToFHIRCast(
    report: Report,
    form: BodyReport[],
  ): Observable<object> {
    const body = { report, form };
    return this.http.post(`${this.apiUrl}/fhircast`, body);
  }
}
