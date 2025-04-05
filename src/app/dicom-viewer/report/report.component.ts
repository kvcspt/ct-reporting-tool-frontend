import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template.service';
import { Scan } from '../../models/scan';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesion } from '../../models/lesion';
import { ToastrService } from 'ngx-toastr';
import { BodyReportComponent } from './body-report/body-report.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  @Input()
  public scans: Scan[] | undefined;
  @ViewChild(BodyReportComponent)
  private bodyReportComponent!: BodyReportComponent;

  public templates: Template[] = [];
  public selectedTemplateId: number | undefined;
  public generatedReport: Report | undefined;
  public reportForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
  });
  public sectionKeys: string[] = [];

  public constructor(
    private templateService: TemplateService,
    private reportService: ReportService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.templateService.getAllTemplates().subscribe({
      next: (data) => {
        this.templates = data;
      },
    });
  }

  public onTemplateSelect(): void {
    if (!!this.selectedTemplateId && this.scans && this.scans.length !== 0) {
      this.reportService
        .generateReport(this.selectedTemplateId, this.scans[0])
        .subscribe({
          next: (report) => {
            this.generatedReport = report;
            this.initializeForm(report);
          },
        });
    }
  }

  public initializeForm(report: Report): void {
    this.reportForm = this.fb.group({
      title: [report.title, Validators.required],
      lesions: this.fb.array([]),
    });

    this.sectionKeys = Object.keys(report.sections);
    this.sectionKeys.forEach((key, index) => {
      this.reportForm.addControl(
        `section_${index}`,
        this.fb.control(report.sections[key], Validators.required),
      );
    });
  }

  public get lesions(): FormArray {
    return this.reportForm.get('lesions') as FormArray;
  }

  public addLesion(): void {
    const lesionGroup = this.fb.group({
      diameterX: [''],
      diameterY: [''],
      diameterZ: [''],
    });
    this.lesions.push(lesionGroup);
  }

  public removeLesion(index: number): void {
    this.lesions.removeAt(index);
  }

  public handleAction(action: string): void {
    if (this.reportForm.valid) {
      // Update the generated report with form data
      this.generatedReport!.title = this.reportForm.value.title;
      this.sectionKeys.forEach((key, index) => {
        this.generatedReport!.sections[key] =
          this.reportForm.value[`section_${index}`];
      });
    }
    this.generatedReport!.lesions = this.lesions.controls.map((control) => {
      const formValues = control.value;
      return new Lesion(
        formValues.diameterX,
        formValues.diameterY,
        formValues.diameterZ,
      );
    });

    switch (action) {
      case 'pdf':
        this.reportService.saveAsPDF(this.generatedReport!).subscribe({
          next: (response) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.generatedReport?.id + '.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            console.error('Error generating PDF:', error);
          },
        });
        break;

      case 'html':
        this.reportService.saveAsHTML(this.generatedReport!).subscribe({
          next: (response) => {
            const blob = new Blob([response], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.generatedReport?.id + '.html';
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (err) => {
            console.error('Error generating HTML:', err);
          },
        });
        break;

      case 'json':
        this.reportService.saveAsJson(this.generatedReport!).subscribe({
          next: (response) => {
            this.downloadJson(response);
          },
          error: (error) => {
            console.error('Error saving JSON:', error);
          },
        });
        break;
      case 'fhirJson':
        this.reportService
          .saveAsFHIRJson(
            this.generatedReport!,
            this.bodyReportComponent.bodyFormComponent.handleAction('fhirJson'),
          )
          .subscribe({
            next: (response) => {
              this.downloadJson(response);
            },
            error: (error) => {
              console.error('Error saving FHIR JSON', error);
            },
          });
        break;
      case 'fhirCast':
        this.reportService
          .uploadToFHIRCast(
            this.generatedReport!,
            this.bodyReportComponent.bodyFormComponent.handleAction('fhirCast'),
          )
          .subscribe({
            next: (response) => {
              this.toastr.success('Uploaded to FHIR server successfully');
              console.log('Uploaded to FHIRCast successfully', response);
            },
            error: (error) => {
              this.toastr.error('Error uploading to FHIR server');
              console.error('Error uploading to FHIRCast', error);
            },
          });
        break;

      default:
        console.error('Unknown action:', action);
    }
  }

  private downloadJson(response: Blob): void {
    const blob = new Blob([response], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = this.generatedReport?.id + '.json';
    link.click();

    window.URL.revokeObjectURL(url);
  }
}
