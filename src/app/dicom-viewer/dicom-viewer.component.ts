import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';
import { Scan } from '../models/scan';
import { ImageInfo, RequestSchema, ToolEnum } from 'ng-cornerstone';
import { Enums } from '@cornerstonejs/core';

@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
})
export class DicomViewerComponent implements OnInit {
  private static readonly DICOM_WEB_URL_ROOT =
    'http://localhost:8080/dicom-web';
  public scans: Scan[] | undefined;
  public toolList = [
    ToolEnum.StackScrollTool,
    ToolEnum.PanTool,
    ToolEnum.ZoomTool,
    ToolEnum.WindowLevelTool,
    ToolEnum.LengthTool,
    ToolEnum.AngleTool,
    ToolEnum.RectangleROITool,
    ToolEnum.EllipticalROITool,
    ToolEnum.TrackballRotateTool,
    ToolEnum.Rotate,
    ToolEnum.Previous,
    ToolEnum.Next,
    ToolEnum.FlipV,
    ToolEnum.FlipH,
    ToolEnum.Reset,
    ToolEnum.Axial,
    ToolEnum.Sagittal,
    ToolEnum.Coronal,
  ];
  public imageInfos: ImageInfo[] = [];
  public constructor(private scanService: ScanService) {}

  public ngOnInit(): void {
    this.scanService.scans$.subscribe({
      next: (data) => {
        this.scans = data.length
          ? data
          : JSON.parse(localStorage.getItem('scans') || '[]');
        this.imageInfos = [];

        if (this.scans && this.scans.length > 0) {
          this.scans.forEach((scan) => {
            this.imageInfos.push({
              studyInstanceUID: scan.studyUid,
              seriesInstanceUID: scan.seriesUid,
              urlRoot: DicomViewerComponent.DICOM_WEB_URL_ROOT,
              viewportType: Enums.ViewportType.STACK,
              schema: RequestSchema.wadoRs,
            });
          });
        }
      },
    });
  }
}
