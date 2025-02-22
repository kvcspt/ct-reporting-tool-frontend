import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BodyTemplate, BodyTemplateElement } from '../../models/template';
import { Utils } from '../../utils/utils';
import { BodyService } from '../../services/body/body.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-body-template-dialog',
  templateUrl: './body-template-dialog.component.html',
})
export class BodyTemplateDialogComponent {
  public dynamicForm: FormGroup;
  public fieldForm: FormGroup;
  public formFields: BodyTemplateElement[] = [];

  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
    private toastr: ToastrService,
  ) {
    this.dynamicForm = this.fb.group({});
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

  public onCheckboxChange(event: any, fieldName: string): void {
    const checkArray: FormArray = this.dynamicForm.get(fieldName) as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(event.target.value));
    } else {
      const index = checkArray.controls.findIndex(
        (ctrl) => ctrl.value === event.target.value,
      );
      if (index !== -1) {
        checkArray.removeAt(index);
      }
    }
  }

  public onSubmit(): void {
    const bodyTemplate = new BodyTemplate(this.formFields);
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
    if (this.dynamicForm.contains(name)) {
      this.dynamicForm.removeControl(name);
    }

    this.formFields = this.formFields.filter((field) => field.name !== name);
  }

  public removeOption(index: number): void {
    const optionsArray = this.fieldForm.get('options') as FormArray;
    optionsArray.removeAt(index);
  }
}
