import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMetadata } from '../../../../../models/template';
import { BodyReport } from '../../../../../models/report';
import { Utils } from '../../../../../utils/utils';
import { BodyService } from '../../../../../services/body.service';
@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
})
export class ChestComponent {
  public chestForm: FormGroup;
  private formMetadata: FormMetadata[];

  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
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

    this.formMetadata = [
      {
        name: '',
        label: 'Procedure Information',
        type: 'textarea',
      },
      {
        name: 'procedureInformationText',
        label: 'Exam',
        type: 'textarea',
      },
      {
        name: 'techniqueText',
        label: 'Technique',
        type: 'textarea',
      },
      {
        name: 'clinicalInformationText',
        label: 'Clinical Information ',
        type: 'textarea',
      },
      {
        name: 'clinicalInformationText',
        label: 'Comparison',
        type: 'textarea',
      },
      {
        name: '',
        label: 'Findings',
        type: 'textarea',
      },
      {
        name: 'presenceOfGroundGlassOpacity',
        label: 'Presence of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'lateralityOfGroundGlassOpacity',
        label: 'Laterality of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'locationOfGroundGlassOpacity',
        label: 'Location of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'predominantDistributionOfGroundGlassOpacity',
        label: 'Predominant distribution of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'quantityOfGroundGlassOpacity',
        label: 'Quantity of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'quantityOfGroundGlassOpacity',
        label: 'Quantity of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'patternOfGroundGlassOpacity',
        label: 'Pattern of ground glass opacity (GGO)',
        type: 'checkbox',
      },
      {
        name: 'morphologyOfGroundGlassOpacity',
        label: 'Morphology of ground glass opacity (GGO)',
        type: 'text',
      },
      {
        name: 'centrilobularNodules',
        label: 'Centrilobular nodules/Tree-in-bud sign',
        type: 'text',
      },
      {
        name: 'solidNodules',
        label: 'Solid nodules',
        type: 'text',
      },
      {
        name: 'airSpaceConsolidation',
        label: 'Air space consolidation',
        type: 'text',
      },
      {
        name: 'presenceOfLymphadenopathy',
        label: 'Presence of lymphadenopathy',
        type: 'text',
      },
      {
        name: 'locationOfLymphadenopathy',
        label: 'Location of lymphadenopathy',
        type: 'checkbox',
      },
      {
        name: 'pleuralEffusionSize',
        label: 'Pleural effusion size',
        type: 'text',
      },
      {
        name: 'presenceOfMucoidImpaction',
        label: 'Presence of mucoid impaction',
        type: 'text',
      },
      {
        name: 'presenceOfBronchialWallThickening',
        label: 'Presence of bronchial wall thickening',
        type: 'text',
      },
      {
        name: 'smoothInterlobularSeptalThickeningSeverity',
        label: 'Smooth interlobular septal thickening severity',
        type: 'text',
      },
      {
        name: 'presenceOfPulmonaryCavities',
        label: 'Presence of pulmonary cavities',
        type: 'text',
      },
      {
        name: 'endotrachealTube',
        label: 'Endotracheal tube',
        type: 'text',
      },
      {
        name: 'studyQuality',
        label: 'Study quality',
        type: 'text',
      },
      {
        name: 'impressionText',
        label: 'Impression',
        type: 'text',
      },
      {
        name: 'covidClassification',
        label: 'COVID-19 Classification',
        type: 'text',
      },
    ];
  }

  public handleAction(type: string): void {
    const formData: BodyReport[] = [];
    this.formMetadata.forEach((field) => {
      if (field.type === 'checkbox') {
        const selectedValuesObj = this.chestForm.get(field.name)?.value;

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
          value: this.chestForm.get(field.name)?.value,
        });
      }
    });

    if (type === 'html') {
      this.bodyService.saveAsHTML(formData).subscribe({
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
      this.bodyService.saveAsPdf(this.chestForm.value).subscribe({
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
