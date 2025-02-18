import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KneeService } from '../../../../../services/body/knee.service';

@Component({
  selector: 'app-knee',
  templateUrl: './knee.component.html',
})
export class KneeComponent {
  public kneeForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private kneeService: KneeService,
  ) {
    this.kneeForm = this.fb.group({
      procedureInformationText: [
        'Thin section transaxial computed tomographic imaging of the knee was performed without intravenous contrast. Sagittal and coronal reconstructions were also created.',
      ],
      clinicalInformationText: ['Knee pain.'],
      comparisonsText: [''],
      findingsText: [''],
      fractureType: this.fb.group({
        femoralCondyle: [false],
        tibialPlateau: [false],
        proximalFibula: [false],
        patella: [false],
        other: [false],
      }),
      fractureFeatures: this.fb.group({
        articularDepression: [false],
        displacement: [false],
        angulation: [false],
        openFracture: [false],
      }),
      softTissueInjuries: this.fb.group({
        woundOrBlister: [false],
        ligamentInjury: [false],
        meniscusInjury: [false],
        neurovascularInjury: [false],
        compartmentSyndrome: [false],
      }),
      tibialPlateauColumns: this.fb.group({
        none: [false],
        anteromedial: [false],
        anterolateral: [false],
        posterolateral: [false],
        posteromedial: [false],
      }),
      threeColumnClassification: this.fb.group({
        zeroColumn: [false],
        oneColumn: [false],
        twoColumn: [false],
        threeColumn: [false],
      }),
      boneFindings: [''],
      alignment: ['Normal'],
      jointSpaces: ['Normal'],
      kneeJointEffusion: ['none'],
      lipohemarthrosis: ['present'],
      extensorMechanism: ['Intact'],
      ligaments: ['Normal'],
      bakersCyst: ['none'],
      softTissue: [''],
      impression: ['Normal CT examination of the knee.'],
    });
  }

  public handleAction(type: string): void {
    if (type === 'html') {
      this.kneeService.saveAsHTML(this.kneeForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'knee' + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error generating HTML:', err);
        },
      });
    } else if (type === 'pdf') {
      this.kneeService.saveAsPdf(this.kneeForm.value).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'text/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'knee' + '.pdf';
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
