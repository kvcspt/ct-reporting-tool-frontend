import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbdomenService } from '../../../../../services/body/abdomen.service';

@Component({
  selector: 'app-abdomen',
  templateUrl: './abdomen.component.html',
})
export class AbdomenComponent {
  public abdomenForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private abdomenService: AbdomenService,
  ) {
    this.abdomenForm = this.fb.group({
      procedureInformationText: [''],
      techniqueText: [''],
      clinicalInformationText: [''],
      comparisonsText: [''],
      findingsText: [''],
      distalEsophagus: [''],
      heartVessels: [''],
      other: [''],
      briefDescription: [''],
      location: [''],
      sizeInOrthogonalDimensionsInCm: [''],
      composition: [''],
      bosniakClassification: [''],
      margins: [''],
      enhancement: [''],
      nonenhancedPhaseAttenuation: [0],
      corticomedullaryPhaseAttenuation: [0],
      nephrographicPhaseAttenuation: [0],
      radius: [''],
      exophyticExtent: [''],
      nearnessToSinus: [''],
      polarLocation: [''],
      axialLocation: [''],
      hilarExtent: [''],
      nephrometryScore: [0],
      invadesPerirenalFat: [''],
      contactsPerirenalFascia: [''],
      invadesThroughPerirenalFascia: [''],
      invadesCentralSinusFat: [''],
      invadesCollectingSystem: [''],
      invadesIpsilateralAdrenal: [''],
      invadesAdjacentOrgans: [''],
      renalArtery: [''],
      renalVeinAnatomy: [''],
      renalArteryStenosis: [''],
      renalVeinThrombus: [''],
      renalVeinThrombusText: [''],
      ivcThrombus: [''],
      ivcThrombusText: [''],
      otherRenalFindings: [''],
      directInvasionsByRenalMass: [''],
      adrenalNodule: [''],
      otherFindings: [''],
      retroperitonealAndPararenalLymphNodes: [''],
      otherLymphNodes: [''],
      liver: [''],
      billiaryTract: [''],
      gallbladder: [''],
      pancreas: [''],
      spleen: [''],
      stomachAndAmallBowel: [''],
      colonAndAppendix: [''],
      peritoneumAndMesentery: [''],
      retroperitoneum: [''],
      otherVessels: [''],
      bodyWall: [''],
      musculoskeletal: [''],
      tumorT: [''],
      nodeN: [''],
      metastasisM: [''],
      impression: [''],
    });
  }

  public handleAction(type: string): void {
    if (type === 'html') {
      this.abdomenService.saveAsHTML(this.abdomenForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'abdomen' + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    } else if (type === 'pdf') {
      this.abdomenService.saveAsPdf(this.abdomenForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'abdomen' + '.pdf';
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
