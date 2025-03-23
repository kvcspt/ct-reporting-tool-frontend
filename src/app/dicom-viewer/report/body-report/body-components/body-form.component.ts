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
import { BodyTemplate, BodyTemplateElement } from '../../../../models/template';
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
      const control = this.createFormControlFromField(field);

      formArray.push(
        this.fb.group({
          groupId: field.groupId,
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

  public getFormArrayControls(): AbstractControl[] {
    return (this.bodyForm.get('bodyTemplateElementDTOs') as FormArray).controls;
  }

  public handleAction(type: string): void {
    const formData = this.getFormArrayControls().map((field) => {
      let value = field.value.control || '';
      console.log(field);
      if (field.value.type === 'checkbox') {
        value = Object.entries(value)
          .filter(([, value]) => value === true)
          .map(([key]) => Utils.camelToTitleCase(key))
          .join(', ');
      }
      return new BodyReport(
        field.value.name,
        field.value.label,
        field.value.type,
        value,
      );
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
    const field = this.getFormArrayControls()[index];
    const groupId = field.value.groupId;

    const fieldsToDuplicate = this.bodyTemplate.bodyTemplateElementDTOs.filter(
      (f) => f.groupId === groupId,
    );

    const formArray = this.bodyForm.get('bodyTemplateElementDTOs') as FormArray;

    fieldsToDuplicate.reverse().forEach((field) => {
      const control = this.createFormControlFromField(field);
      const newGroup = this.fb.group({
        groupId: groupId,
        label: field.label,
        name: field.name,
        type: field.type,
        duplicate: field.duplicate,
        control: control,
        options: [field.options || []],
      });
      formArray.insert(index + 1, newGroup);
    });
  }

  private createFormControlFromField(field: BodyTemplateElement): any {
    let control: any;

    if (field.type === 'checkbox') {
      control = this.fb.group({});
      field.options?.forEach((option: string) => {
        control.addControl(option, new FormControl(false));
      });
    } else {
      control = new FormControl('');
    }

    return control;
  }

  public removeDuplicateField(index: number): void {
    const field = this.getFormArrayControls()[index];
    if (!field) return;

    const groupId = field.value.groupId;
    const formArray = this.bodyForm.get('bodyTemplateElementDTOs') as FormArray;

    const fieldsToRemove = this.bodyTemplate.bodyTemplateElementDTOs.filter(
      (element) => element.groupId === groupId,
    );

    fieldsToRemove.forEach((fieldToRemove) => {
      const formIndex = this.getFormArrayControls()
        .map((control, i) => ({ control, i }))
        .filter(
          (item) =>
            item.control.value.groupId === fieldToRemove.groupId &&
            item.control.value.label === fieldToRemove.label &&
            item.control.value.name === fieldToRemove.name,
        )
        .pop()?.i;

      if (formIndex !== undefined) {
        formArray.removeAt(formIndex);
      }
    });
  }

  public isLastInGroup(index: number): boolean {
    const formArray = this.bodyForm.get('bodyTemplateElementDTOs') as FormArray;
    const currentGroupId = formArray.at(index)?.value.groupId;
    const nextFieldGroupId = formArray.at(index + 1)?.value?.groupId;

    return (
      nextFieldGroupId === undefined || nextFieldGroupId !== currentGroupId
    );
  }
}
