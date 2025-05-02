import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Scan } from '../../models/scan';
import { ScanService } from '../../services/scan.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-table',
  templateUrl: './scan-table.component.html',
})
export class ScanTableComponent implements AfterViewInit, AfterViewChecked {
  @Output() private deleteComplete = new EventEmitter<void>();
  @Input()
  public filteredScans: Array<Scan> = [];
  public displayedColumns: string[] = [
    'description',
    'modality',
    'scanDate',
    'bodyPart',
    'patient',
    'open',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Scan>(this.filteredScans);
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public constructor(
    private scanService: ScanService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}

  public ngAfterViewInit(): void {
    this.dataSource.data = [...this.filteredScans];
    this.dataSource.paginator = this.paginator;
  }

  public ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public deleteScan(scanId: number): void {
    this.scanService.deleteScan(scanId).subscribe({
      next: () => {
        this.toastr.success('Scan deleted successfully');
        this.filteredScans = this.filteredScans.filter(
          (scan) => scan.id !== scanId,
        );
        this.deleteComplete.emit();
        this.dataSource.data = [...this.filteredScans];
      },
      error: () => {
        this.toastr.error('Failed to delete scan');
      },
    });
  }

  public openScanStudy(scan: Scan): void {
    console.log('Opening scan:', scan);

    const scans = [scan];
    localStorage.setItem('scans', JSON.stringify(scans));
    this.router.navigate(['/dicom-viewer']);
  }
}
