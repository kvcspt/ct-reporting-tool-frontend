import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
})
export class SectionDialogComponent {
  public key: string;
  public value: string;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: string },
  ) {
    this.key = data.key;
    this.value = data.value;
  }
}
