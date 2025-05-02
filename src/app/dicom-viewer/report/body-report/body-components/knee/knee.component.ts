import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMetadata } from '../../../../../models/template';
import { BodyReport } from '../../../../../models/report';
import { BodySectionComponent, Utils } from '../../../../../utils/utils';
import { BodyService } from '../../../../../services/body.service';

@Component({
  selector: 'app-knee',
  templateUrl: './knee.component.html',
})
export class KneeComponent implements BodySectionComponent {
  public kneeForm: FormGroup;
  private formMetadata: FormMetadata[];
  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
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

    this.formMetadata = [
      {
        name: '',
        label: 'Procedure Information',
        type: 'text',
      },
      { name: 'procedureInformationText', label: 'Technique', type: 'text' },
      { name: 'clinicalInformationText', label: 'History', type: 'text' },
      { name: 'comparisonsText', label: 'Comparison', type: 'text' },
      { name: '', label: 'Findings', type: 'text' },

      { name: 'findingsText', label: 'Fracture', type: 'text' },
      { name: 'fractureType', label: 'Type of fracture', type: 'checkbox' },
      {
        name: 'fractureFeatures',
        label: 'Fracture features',
        type: 'checkbox',
      },
      {
        name: 'softTissueInjuries',
        label: 'Associated soft tissue injuries',
        type: 'checkbox',
      },
      {
        name: 'tibialPlateauColumns',
        label: 'Columns involved if tibial plateau fracture',
        type: 'checkbox',
      },
      {
        name: 'threeColumnClassification',
        label: 'Three column classification if tibial plateau fracture',
        type: 'checkbox',
      },
      { name: 'boneFindings', label: 'Additional bone findings', type: 'text' },
      { name: 'alignment', label: 'Alignment', type: 'text' },
      { name: 'jointSpaces', label: 'Joint spaces', type: 'text' },
      { name: 'kneeJointEffusion', label: 'Knee joint effusion', type: 'text' },
      { name: 'lipohemarthrosis', label: 'Lipohemarthrosis', type: 'text' },
      { name: 'extensorMechanism', label: 'Extensor mechanism', type: 'text' },
      { name: 'ligaments', label: 'Ligaments', type: 'text' },
      { name: 'bakersCyst', label: 'Baker’s cyst', type: 'text' },
      { name: 'softTissue', label: 'Soft tissue', type: 'text' },
      { name: 'impression', label: 'Impression', type: 'text' },
    ];
  }

  public handleAction(type: string): void {
    const formData = this.getReportData();

    if (type === 'html') {
      this.bodyService.saveAsHTML(formData).subscribe({
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
      this.bodyService.saveAsPdf(formData).subscribe({
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

  public getReportData(): BodyReport[] {
    const formData: BodyReport[] = [];
    this.formMetadata.forEach((field) => {
      if (field.type === 'checkbox') {
        const selectedValuesObj = this.kneeForm.get(field.name)?.value;

        if (selectedValuesObj) {
          const selected = Object.entries(selectedValuesObj)
            .filter(([, value]) => value)
            .map(([key]) => Utils.camelToTitleCase(key))
            .join(', ');

          formData.push({
            name: field.name,
            label: field.label,
            type: field.type,
            value: selected,
          });
        }
      } else {
        formData.push({
          name: field.name,
          label: field.label,
          type: field.type,
          value: this.kneeForm.get(field.name)?.value,
        });
      }
    });

    return formData;
  }
}
