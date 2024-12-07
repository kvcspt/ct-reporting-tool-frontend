import { Component, EventEmitter, Output } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { ToastrService } from 'ngx-toastr';
import { Scan } from '../../models/scan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-upload',
  templateUrl: './scan-upload.component.html',
})
export class ScanUploadComponent {
  @Output() public uploadComplete = new EventEmitter<void>();
  public selectedFiles: FileList | null = null;

  public constructor(
    private scanService: ScanService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }

  public onUpload(): void {
    if (this.selectedFiles) {
      this.scanService.uploadDicomFiles(this.selectedFiles).subscribe({
        next: (scans: Scan[]) => {
          this.toastr.success('Upload successful!');
          this.uploadComplete.emit();
          this.scanService.setScans(scans);
          localStorage.setItem('scans', JSON.stringify(scans));
          this.router.navigate(['/dicom-viewer']);
        },
        error: () => this.toastr.error('Upload error!'),
      });
    }
  }
}
