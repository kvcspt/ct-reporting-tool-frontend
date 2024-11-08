import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';
import { Scan } from '../models/scan';

@Component({
  selector: 'app-ct-studies',
  templateUrl: './ct-studies.component.html',
})
export class CtStudiesComponent implements OnInit {
  public notification: string | null = null;
  public scans: Array<Scan> = [];
  public filteredScans: Array<Scan> = [];
  public searchTerm: string = '';
  public viewScans = false;
  public uploadScans = false;

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
      error: () => {
        this.notification = 'Failed to load scans.';
      },
    });
  }

  filterScans() {
    if (!this.searchTerm) {
      this.filteredScans = this.scans;
    } else {
      this.filteredScans = this.scans.filter((scan) => {
        const date = new Date(scan.scanDate);
        const formattedScanDate = date.toLocaleDateString();
        return (
          scan.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          formattedScanDate.includes(this.searchTerm)
        );
      });
    }
  }
}
