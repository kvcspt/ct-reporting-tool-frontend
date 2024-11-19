import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateService } from '../../../services/template.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
})
export class SectionDialogComponent implements OnInit {
  public key: string;
  public value: string;
  public fields$: Observable<string[]> | undefined;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: string },
    private templateService: TemplateService,
  ) {
    this.key = data.key;
    this.value = data.value;
  }

  public ngOnInit(): void {
    this.fields$ = this.templateService.getFields();
  }
}
