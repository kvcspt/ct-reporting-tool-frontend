import { Component } from '@angular/core';
import {ScanService} from "../../services/scan.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-scan-upload',
  templateUrl: './scan-upload.component.html'
})
export class ScanUploadComponent {
  selectedFiles: FileList | null = null;

  constructor(private scanService: ScanService, private toastr: ToastrService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onUpload(): void {
    if (this.selectedFiles) {
      this.scanService.uploadDicomFiles(this.selectedFiles).subscribe({
        next: response => this.toastr.success('Upload successful:', response),
        error: error => this.toastr.error('Upload error:', error)
      });
    }
  }
}
