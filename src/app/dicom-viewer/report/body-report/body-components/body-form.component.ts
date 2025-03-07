import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { BodyTemplate } from '../../../../models/template';
import { BodyService } from '../../../../services/body/body.service';
import { BodyReport } from '../../../../models/report';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-body-form',
  templateUrl: './body-form.component.html',
})
export class BodyFormComponent implements OnInit, OnChanges {
  public bodyForm!: FormGroup;
  @Input() public bodyTemplate!: BodyTemplate;
  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['bodyTemplate'] && changes['bodyTemplate'].currentValue) {
      this.createDynamicForm();
    }
  }

  public ngOnInit(): void {
    this.createDynamicForm();
  }

  private createDynamicForm(): void {
    this.bodyForm = this.fb.group({
      title: new FormControl({
        value: this.bodyTemplate.title,
        disabled: true,
      }),
      bodyTemplateElementDTOs: this.fb.array([]),
    });

    this.populateForm();
  }

  private populateForm(): void {
    const formArray = this.bodyForm.get('bodyTemplateElementDTOs') as FormArray;

    this.bodyTemplate.bodyTemplateElementDTOs.forEach((field) => {
      let control: any;

      if (field.duplicate) {
        control = this.fb.array([new FormControl('')]);
      } else if (field.type === 'checkbox') {
        control = this.fb.group({});
        field.options?.forEach((option: string) => {
          control.addControl(option, new FormControl(false));
        });
      } else {
        control = new FormControl('');
      }

      formArray.push(
        this.fb.group({
          label: field.label,
          name: field.name,
          type: field.type,
          duplicate: field.duplicate,
          control: control,
          options: [field.options || []],
        }),
      );
    });
  }

  public onCheckboxChange(event: Event, field: any, option: any): void {
    const checkbox = event.target as HTMLInputElement;
    const formGroup = this.getFormArrayControls().find(
      (value) => value.get('name')?.value === field.value.name,
    );
    if (formGroup) {
      const control = formGroup.get('control') as FormGroup;

      control.get(option)?.setValue(checkbox.checked);
    }
  }

  public getFormArrayControls(): AbstractControl<any, any>[] {
    return (this.bodyForm.get('bodyTemplateElementDTOs') as FormArray).controls;
  }

  public handleAction(type: string): void {
    const formData = this.bodyTemplate.bodyTemplateElementDTOs.map((field) => {
      const fieldGroup = this.getFormArrayControls().find(
        (control) => control.get('name')?.value === field.name,
      );

      let value = fieldGroup?.get('control')?.value || '';

      if (field.type === 'checkbox') {
        value = Object.entries(value)
          .filter(([, value]) => value === true)
          .map(([key]) => Utils.camelToTitleCase(key))
          .join(', ');
      }
      return new BodyReport(field.name, field.label, field.type, value);
    });

    console.log(formData);

    if (type === 'html') {
      this.bodyService.saveAsHTML(formData).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'body' + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    } else if (type === 'pdf') {
      this.bodyService.saveAsPdf(formData).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'body' + '.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    }
  }

  public addDuplicateField(index: number): void {
    const duplicateControls = this.getDuplicateFormArray(index);
    duplicateControls.push(new FormControl(''));
  }

  public removeDuplicateField(index: number, duplicateIndex: number): void {
    const duplicateControls = this.getDuplicateFormArray(index);
    duplicateControls.removeAt(duplicateIndex);
  }

  public getDuplicateFormArray(index: number): FormArray {
    return (this.bodyForm.get('bodyTemplateElementDTOs') as FormArray)
      .at(index)
      .get('control') as FormArray;
  }

  public getDuplicateFormArrayControls(index: number): FormControl<any>[] {
    return this.getDuplicateFormArray(index).controls as FormControl[];
  }
}
