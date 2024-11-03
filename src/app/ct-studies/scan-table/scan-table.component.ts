import {Component, Input} from '@angular/core';
import {Scan} from "../../models/scan";

@Component({
  selector: 'app-scan-table',
  templateUrl: './scan-table.component.html'
})
export class ScanTableComponent {
  @Input()
  public filteredScans: Array<Scan> = [];
  displayedColumns: string[] = ['description', 'modality', 'scanDate', 'bodyPart'];

}
