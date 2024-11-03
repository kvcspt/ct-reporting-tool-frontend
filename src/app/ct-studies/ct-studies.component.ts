import { Component } from '@angular/core';
import {ScanService} from "../services/scan.service";
import {Scan} from "../model/Scan";

@Component({
  selector: 'app-ct-studies',
  templateUrl: './ct-studies.component.html'
})
export class CtStudiesComponent {
  public notification: string | null = null;
  public scans: Array<Scan> = [];
  public filteredScans: Array<Scan> = [];
  public searchTerm: string = '';

  constructor(private scanService: ScanService) {}

  ngOnInit() {
    this.loadScans();
  }

  loadScans() {
    this.scanService.getScans().subscribe({
      next: (data) => {
        this.scans = data;
        this.filteredScans = data;
      },
      error: (err) => {
        this.notification = 'Failed to load scans.';
      }
    });
  }

  filterScans() {
    if (!this.searchTerm) {
      this.filteredScans = this.scans;
    } else {
      this.filteredScans = this.scans.filter(scan => {
        const date = new Date(scan.scanDate);
        const formattedScanDate = date.toLocaleDateString();
        return scan.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          formattedScanDate.includes(this.searchTerm);
      });
    }
    console.log(this.filteredScans);
  }


  onUploadClick() {
    // Logic to handle upload button click
    // For example, navigate to upload form
  }

  onViewScansClick() {
    // Logic to handle view scans button click
    // This might show the current list of scans or navigate to a detailed view
  }
}
