import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { BodyTemplate, Template } from '../models/template';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { BodyTemplateDialogComponent } from './body-template-dialog/body-template-dialog.component';
import { BodyService } from '../services/body.service';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
})
export class TemplateManagementComponent implements OnInit {
  public selectedTemplate: Template | null = null;
  public templates: Template[] = [];
  public bodyTemplates: BodyTemplate[] = [];
  public selectedBodyTemplate: BodyTemplate | null = null;

  public constructor(
    private templateService: TemplateService,
    private bodyService: BodyService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.loadTemplates();
  }

  public loadTemplates(): void {
    this.templateService
      .getAllTemplates()
      .subscribe((templates: Template[]) => {
        this.templates = templates;
      });

    this.bodyService
      .getBodyTemplates()
      .subscribe((bodyTemplates1: BodyTemplate[]) => {
        this.bodyTemplates = bodyTemplates1;
      });
  }

  public createNewTemplate(): void {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      data: {
        template: new Template(0, '', {}),
        isNew: true,
      },
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.templateService.createTemplate(result).subscribe(() => {
          this.loadTemplates();
        });
      }
    });
  }

  public editTemplate(template: Template): void {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      data: {
        template: template,
        isNew: false,
      },
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action == 'delete') {
          this.templateService.deleteTemplate(template).subscribe(() => {
            this.loadTemplates();
          });
        } else {
          this.templateService.updateTemplate(result).subscribe(() => {
            this.loadTemplates();
          });
        }
      }
    });
  }

  public editBodyTemplate(template: BodyTemplate): void {
    const dialogRef = this.dialog.open(BodyTemplateDialogComponent, {
      data: {
        template: template,
        isNew: false,
      },
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTemplates();
    });
  }

  public createNewBodyTemplate(): void {
    const dialogRef = this.dialog.open(BodyTemplateDialogComponent, {
      data: {
        template: new BodyTemplate('', []),
        isNew: true,
      },
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTemplates();
    });
  }
}
