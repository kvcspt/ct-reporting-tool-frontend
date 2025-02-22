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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: { template: BodyTemplate; isNew: boolean },
  ) {
    this.title = data?.template.title;
    this.formFields = data?.template.bodyTemplateElementDTOs;
    this.isNew = data.isNew;
    this.dynamicForm = this.fb.group({
      title: [
        { value: !this.isNew ? this.title : '', disabled: !this.isNew },
        Validators.required,
      ],
    });
    this.fieldForm = this.fb.group({
      label: [''],
      type: ['text'],
      options: this.fb.array([]),
    });
  }

  public addField(): void {
    const field = this.fieldForm.value;
    field.name = Utils.toCamelCase(field.label);

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
}
