import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChestService } from '../../../../../services/body/chest.service';

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
})
export class ChestComponent {
  public chestForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private chestService: ChestService,
  ) {
    this.chestForm = this.fb.group({
      procedureInformationText: [''],
      techniqueText: [''],
      clinicalInformationText: [''],
      comparisonsText: [''],
      presenceOfGroundGlassOpacity: [''],
      lateralityOfGroundGlassOpacity: [''],
      locationOfGroundGlassOpacity: [''],
      predominantDistributionOfGroundGlassOpacity: [''],
      quantityOfGroundGlassOpacity: [''],
      patternOfGroundGlassOpacity: this.fb.group({
        mosaicAttenuation: [false],
        crazyPaving: [false],
        withConsolidation: [false],
        reverseHaloAtollSign: [false],
      }),
      morphologyOfGroundGlassOpacity: [''],
      centrilobularNodules: [''],
      solidNodules: [''],
      airSpaceConsolidation: [''],
      presenceOfLymphadenopathy: [''],
      locationOfLymphadenopathy: this.fb.group({
        hilar: [false],
        mediastinal: [false],
        other: [false],
      }),
      pleuralEffusionSize: [''],
      presenceOfMucoidImpaction: [''],
      presenceOfBronchialWallThickening: [''],
      smoothInterlobularSeptalThickeningSeverity: [''],
      presenceOfPulmonaryCavities: [''],
      endotrachealTube: [''],
      studyQuality: [''],
      impressionText: [''],
      covidClassification: [''],
    });
  }

  public handleAction(type: string): void {
    if (type === 'html') {
      this.chestService.saveAsHTML(this.chestForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'chest' + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    } else if (type === 'pdf') {
      this.chestService.saveAsPdf(this.chestForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'chest' + '.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    }
  }
}
