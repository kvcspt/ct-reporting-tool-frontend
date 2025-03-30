import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMetadata } from '../../../../../models/template';
import { BodyReport } from '../../../../../models/report';
import { Utils } from '../../../../../utils/utils';
import { BodyService } from '../../../../../services/body.service';

@Component({
  selector: 'app-abdomen',
  templateUrl: './abdomen.component.html',
})
export class AbdomenComponent {
  public abdomenForm: FormGroup;
  private formMetadata: FormMetadata[];

  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
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

    this.formMetadata = [
      { name: '', label: 'Procedure Information', type: 'text' },
      { name: 'procedureInformationText', label: 'Exam', type: 'text' },
      { name: 'techniqueText', label: 'Technique', type: 'text' },
      {
        name: 'clinicalInformationText',
        label: 'Clinical Information',
        type: 'text',
      },
      { name: 'comparisonsText', label: 'Comparison', type: 'text' },
      { name: '', label: 'Findings', type: 'text' },
      { name: 'findingsText', label: 'Lung bases / pleura', type: 'text' },
      { name: 'distalEsophagus', label: 'Distal esophagus', type: 'text' },
      { name: 'heartVessels', label: 'Heart / vessels', type: 'text' },
      { name: 'other', label: 'Other', type: 'text' },
      { name: 'briefDescription', label: 'Brief description', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      {
        name: 'sizeInOrthogonalDimensionsInCm',
        label: 'Size in 3 orthogonal dimensions in cm',
        type: 'text',
      },
      { name: 'composition', label: 'Composition', type: 'text' },
      {
        name: 'bosniakClassification',
        label: 'Bosniak classification',
        type: 'text',
      },
      { name: 'margins', label: 'Margins', type: 'text' },
      { name: 'enhancement', label: 'Enhancement', type: 'text' },
      {
        name: 'corticomedullaryPhaseAttenuation',
        label: 'Corticomedullary phase attenuation',
        type: 'text',
      },
      {
        name: 'nephrographicPhaseAttenuation',
        label: 'Nephrographic phase attenuation',
        type: 'text',
      },
      { name: 'radius', label: 'Radius', type: 'text' },
      { name: 'exophyticExtent', label: 'Exophytic extent', type: 'text' },
      { name: 'nearnessToSinus', label: 'Nearness to Sinus', type: 'text' },
      { name: 'polarLocation', label: 'Polar location of mass', type: 'text' },
      { name: 'axialLocation', label: 'Axial location', type: 'text' },
      { name: 'hilarExtent', label: 'Hilar extent', type: 'text' },
      {
        name: 'nephrometryScore',
        label: 'Nephrometry score (points)',
        type: 'text',
      },
      {
        name: 'invadesPerirenalFat',
        label: 'Invades perirenal fat',
        type: 'text',
      },
      {
        name: 'contactsPerirenalFascia',
        label: 'Contacts the perirenal fascia',
        type: 'text',
      },
      {
        name: 'invadesCentralSinusFat',
        label: 'Invades central sinus fat',
        type: 'text',
      },
      {
        name: 'invadesCollectingSystem',
        label: 'Invades collecting system',
        type: 'text',
      },
      {
        name: 'invadesIpsilateralAdrenal',
        label: 'Invades ipsilateral adrenal',
        type: 'text',
      },
      {
        name: 'invadesAdjacentOrgans',
        label: 'Invades adjacent organs or structures',
        type: 'text',
      },
      { name: 'renalArtery', label: 'Renal artery', type: 'text' },
      {
        name: 'renalArteryStenosis',
        label: 'Significant renal artery stenosis &gt;70%',
        type: 'text',
      },
      { name: 'renalVeinAnatomy', label: 'Renal vein anatomy', type: 'text' },
      { name: 'renalVeinThrombus', label: 'Renal vein thrombus', type: 'text' },
      {
        name: 'renalVeinThrombusText',
        label: 'Renal vein thrombus',
        type: 'text',
      },
      { name: 'ivcThrombus', label: 'IVC thrombus', type: 'text' },
      { name: 'ivcThrombusText', label: 'IVC thrombus', type: 'text' },
      {
        name: 'otherRenalFindings',
        label: 'Other renal findings',
        type: 'text',
      },
      {
        name: 'directInvasionsByRenalMass',
        label: 'Direct invasions by renal mass',
        type: 'text',
      },
      { name: 'adrenalNodule', label: 'Adrenal nodule', type: 'text' },
      { name: 'otherFindings', label: 'Other findings', type: 'text' },
      {
        name: 'retroperitonealAndPararenalLymphNodes',
        label: 'Retroperitoneal and pararenal lymph nodes',
        type: 'text',
      },
      { name: 'otherLymphNodes', label: 'Other lymph nodes', type: 'text' },
      { name: 'liver', label: 'Liver', type: 'text' },
      { name: 'billiaryTract', label: 'Billiary tract', type: 'text' },
      { name: 'gallbladder', label: 'ExGallbladderam', type: 'text' },
      { name: 'pancreas', label: 'Pancreas', type: 'text' },
      { name: 'spleen', label: 'Spleen', type: 'text' },
      {
        name: 'stomachAndAmallBowel',
        label: 'Stomach and small bowel',
        type: 'text',
      },
      { name: 'colonAndAppendix', label: 'Colon and appendix', type: 'text' },
      {
        name: 'peritoneumAndMesentery',
        label: 'Peritoneum and mesentery',
        type: 'text',
      },
      { name: 'retroperitoneum', label: 'Retroperitoneum', type: 'text' },
      { name: 'otherVessels', label: 'Other vessels', type: 'text' },
      { name: 'bodyWall', label: 'Body wall', type: 'text' },
      { name: 'musculoskeletal', label: 'Musculoskeletal', type: 'text' },
      { name: 'tumorT', label: 'Tumor (T)', type: 'text' },
      { name: 'nodeN', label: 'Node (N)', type: 'text' },
      { name: 'metastasisM', label: 'Metastasis (M)', type: 'text' },
      { name: 'impression', label: 'Impression', type: 'text' },
    ];
  }

  public handleAction(type: string): void {
    const formData: BodyReport[] = [];
    this.formMetadata.forEach((field) => {
      if (field.type === 'checkbox') {
        const selectedValuesObj = this.abdomenForm.get(field.name)?.value;

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
          value: this.abdomenForm.get(field.name)?.value,
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
          a.download = 'abdomen' + '.html';
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
