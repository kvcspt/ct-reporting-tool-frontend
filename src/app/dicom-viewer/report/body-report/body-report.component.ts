import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { BodyTemplate } from '../../../models/template';
import { BodyService } from '../../../services/body.service';
import { ToastrService } from 'ngx-toastr';
import { KneeComponent } from './body-components/knee/knee.component';
import { AbdomenComponent } from './body-components/abdomen/abdomen.component';
import { ChestComponent } from './body-components/chest/chest.component';
import { LiverComponent } from './body-components/liver/liver.component';
import { BodyFormComponent } from './body-components/body-form.component';

@Component({
  selector: 'app-body-report',
  templateUrl: './body-report.component.html',
})
export class BodyReportComponent implements OnInit {
  @ViewChild(BodyFormComponent) public bodyFormComponent!: BodyFormComponent;
  public templateFiles = [
    'knee.html',
    'liver.html',
    'chest.html',
    'abdomen.html',
  ];
  public savedTemplates: BodyTemplate[] = [];
  public selectedBodyTemplate: string | undefined;
  public selectedComponent: Type<any> | null = null;
  public selectedBodyTemplateObject: BodyTemplate | null = null;
  private templateComponentMap: { [key: string]: Type<any> } = {
    'knee.html': KneeComponent,
    'abdomen.html': AbdomenComponent,
    'chest.html': ChestComponent,
    'liver.html': LiverComponent,
  };

  public constructor(
    private bodyService: BodyService,
    private toastr: ToastrService,
  ) {}
  public ngOnInit(): void {
    this.bodyService.getBodyTemplates().subscribe({
      next: (value) => {
        this.savedTemplates = value;

        this.templateFiles = [
          'knee.html',
          'liver.html',
          'chest.html',
          'abdomen.html',
          ...this.savedTemplates.map((template) => template.title + '.html'),
        ];
      },
      error: (err) =>
        this.toastr.error('Failed to load templates: ' + err.error),
    });
  }

  public onTemplateChange(): void {
    if (this.templateComponentMap[this.selectedBodyTemplate || '']) {
      this.selectedComponent =
        this.templateComponentMap[this.selectedBodyTemplate || ''];
      this.selectedBodyTemplateObject = null;
    } else {
      this.selectedComponent = null;

      const foundTemplate = this.savedTemplates.find(
        (template) => template.title + '.html' === this.selectedBodyTemplate,
      );

      this.selectedBodyTemplateObject = foundTemplate
        ? { ...foundTemplate }
        : null;
    }
  }
}
