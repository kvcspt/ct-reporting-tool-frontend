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

@Component({
  selector: 'app-scan-table',
  templateUrl: './scan-table.component.html',
})
export class ScanTableComponent implements AfterViewInit, AfterViewChecked {
  @Input()
  public filteredScans: Array<Scan> = [];
  @Output() deleteComplete = new EventEmitter<void>();
  displayedColumns: string[] = [
    'description',
    'modality',
    'scanDate',
    'bodyPart',
    'patient',
    'delete',
  ];
  dataSource = new MatTableDataSource<Scan>(this.filteredScans);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private scanService: ScanService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.dataSource.data = [...this.filteredScans];
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  deleteScan(scanId: number) {
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
}
