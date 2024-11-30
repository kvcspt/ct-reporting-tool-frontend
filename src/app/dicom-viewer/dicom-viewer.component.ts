import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';
import { Scan } from '../models/scan';

@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
})
export class DicomViewerComponent implements OnInit {
  public scans: Scan[] | undefined;
  public constructor(private scanService: ScanService) {}

  public ngOnInit(): void {
    this.scanService.scans$.subscribe({
      next: (data) => {
        this.scans = data;
      },
    });
  }
}
