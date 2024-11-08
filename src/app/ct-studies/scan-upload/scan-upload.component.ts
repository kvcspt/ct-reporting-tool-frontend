import { Component, EventEmitter, Output } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scan-upload',
  templateUrl: './scan-upload.component.html',
})
export class ScanUploadComponent {
  @Output() uploadComplete = new EventEmitter<void>();
  selectedFiles: FileList | null = null;

  constructor(
    private scanService: ScanService,
    private toastr: ToastrService,
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }

  onUpload(): void {
    if (this.selectedFiles) {
      this.scanService.uploadDicomFiles(this.selectedFiles).subscribe({
        next: () => {
          this.toastr.success('Upload successful!');
          this.uploadComplete.emit();
        },
        error: () => this.toastr.error('Upload error!'),
      });
    }
  }
}
