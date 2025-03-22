import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BodyTemplate, BodyTemplateElement } from '../../models/template';
import { Utils } from '../../utils/utils';
import { BodyService } from '../../services/body/body.service';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-body-template-dialog',
  templateUrl: './body-template-dialog.component.html',
})
export class BodyTemplateDialogComponent {
  public dynamicForm: FormGroup;
  public fieldForm: FormGroup;
  public formFields: BodyTemplateElement[] = [];
  public title: string;
  public isNew: boolean = true;
  public editingFieldName: string | null = null;
  public tempLabel: string = '';

  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<BodyTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { template: BodyTemplate; isNew: boolean; duplicate: boolean },
  ) {
    this.title = data?.template?.title || '';
    this.formFields = data?.template?.bodyTemplateElementDTOs || [];
    this.isNew = data.isNew;
    this.dynamicForm = this.fb.group({
      title: [this.title, Validators.required],
    });

    this.fieldForm = this.fb.group({
      groupId: 0,
      label: [''],
      type: ['text'],
      duplicate: [false],
      options: this.fb.array([]),
    });
  }

  public startEditingLabel(field: any): void {
    this.editingFieldName = field.name;
    this.dynamicForm.addControl(
      'tempLabel',
      new FormControl(field.label, Validators.required),
    );
  }

  public saveLabel(field: any): void {
    field.label = this.dynamicForm.get('tempLabel')?.value;
    this.editingFieldName = null;
    this.dynamicForm.removeControl('tempLabel');
  }

  public cancelEditingLabel(): void {
    this.editingFieldName = null;
    this.dynamicForm.removeControl('tempLabel');
  }

  public addField(): void {
    const field = this.fieldForm.value;
    field.name = Utils.toCamelCase(field.label);
    field.groupId = 0;

    field.duplicate = this.data.duplicate;

    if (field.type === 'checkbox' || field.type === 'radio') {
      this.dynamicForm.addControl(
        field.name,
        this.fb.array([...field.options]),
      );
    } else {
      this.dynamicForm.addControl(field.name, new FormControl(''));
    }

    const optionsArray = this.fieldForm.get('options') as FormArray;
    this.formFields.push({
      ...field,
      options: [...optionsArray.value],
    });

    this.fieldForm.reset({ label: '', type: 'text', options: [] });
    optionsArray.clear();
  }

  public addOption(option: string): void {
    if (option) {
      (this.fieldForm.get('options') as FormArray).push(
        new FormControl(option),
      );
    }
  }

  public onSubmit(): void {
    const bodyTemplate = new BodyTemplate(
      (this.dynamicForm.get('title') as FormControl).value,
      this.formFields,
    );
    this.formFields = [];
    this.bodyService.createBodyTemplate(bodyTemplate).subscribe({
      next: () => {
        this.toastr.success('Successful template creation');
      },
      error: (err) => {
        this.toastr.error('Something went wrong: ', err.error);
        console.error('Error generating HTML:', err);
      },
    });
  }

  public removeField(name: string): void {
    this.formFields = this.formFields.filter((field) => field.name !== name);
  }

  public removeOption(index: number): void {
    const optionsArray = this.fieldForm.get('options') as FormArray;
    optionsArray.removeAt(index);
  }

  public updateBodyTemplate(): void {
    const bodyTemplate = new BodyTemplate(
      (this.dynamicForm.get('title') as FormControl).value,
      this.formFields,
    );

    console.log(bodyTemplate);
    this.bodyService.updateBodyTemplate(bodyTemplate).subscribe({
      next: () => {
        this.toastr.success('Successful template creation');
      },
      error: (err) => {
        this.toastr.error('Something went wrong: ', err.error);
        console.error('Error generating HTML:', err);
      },
    });
  }

  public deleteBodyTemplate(): void {
    this.bodyService
      .deleteBodyTemplate((this.dynamicForm.get('title') as FormControl).value)
      .subscribe({
        next: () => {
          this.toastr.success('Successful template creation');
        },
        error: (err) => {
          this.toastr.error('Something went wrong: ', err.error);
          console.error('Error generating HTML:', err);
        },
      });
  }

  public duplicateGroup(): void {
    const newGroupId = this.getNewGroupId();
    const dialogRef = this.dialog.open(BodyTemplateDialogComponent, {
      data: {
        isNew: true,
        duplicate: true,
      },
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result && result.result.length > 0) {
        result.result.forEach((res: BodyTemplateElement) => {
          res.groupId = res.duplicate ? newGroupId : 0;
          this.formFields.push(res);
        });
      }
    });
  }

  private getNewGroupId(): number {
    const existingGroupIds = this.formFields
      .map((f) => f.groupId)
      .filter((id) => id !== 0); // Ignore fields with groupId = 0
    return existingGroupIds.length > 0 ? Math.max(...existingGroupIds) + 1 : 1;
  }

  public onClose(): void {
    this.dialogRef.close({ result: this.formFields });
  }
}
