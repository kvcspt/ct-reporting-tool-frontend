import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Template } from '../../models/template';
import { SectionDialogComponent } from './section-dialog/section-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
})
export class TemplateDialogComponent {
  public template: Template;
  public isNew: boolean;

  public constructor(
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { template: Template; isNew: boolean },
    private dialog: MatDialog,
  ) {
    this.template = data.template;
    this.isNew = data.isNew;
  }

  public editSection(key: string): void {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      data: {
        key: key,
        value: this.template.sections[key],
      },
      width: '400px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.template.sections[result.key] = result.value;
      }
    });
  }

  public addSection(): void {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      data: { key: '', value: '' },
      width: '400px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.template.sections[result.key] = result.value;
      }
    });
  }

  public removeSection(key: string): void {
    delete this.template.sections[key];
  }

  public confirmDelete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.template.name,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dialogRef.close({ action: 'delete', template: this.template });
      }
    });
  }
}
