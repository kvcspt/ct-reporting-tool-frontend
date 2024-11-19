import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { Template } from '../models/template';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
})
export class TemplateManagementComponent implements OnInit {
  public selectedTemplate: Template | null = null;
  public templates: Template[] = [];

  public constructor(
    private templateService: TemplateService,
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
}
