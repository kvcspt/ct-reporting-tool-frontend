import { Component } from '@angular/core';

@Component({
  selector: 'app-body-report',
  templateUrl: './body-report.component.html',
})
export class BodyReportComponent {
  public templateFiles = [
    'knee.html',
    'liver.html',
    'chest.html',
    'abdomen.html',
  ];
  public selectedBodyTemplate: string | undefined;
}
