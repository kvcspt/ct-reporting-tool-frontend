import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BodyReport } from '../../../../../models/report';
import { Utils } from '../../../../../utils/utils';
import { FormMetadata } from '../../../../../models/template';
import { BodyService } from '../../../../../services/body.service';

@Component({
  selector: 'app-liver',
  templateUrl: './liver.component.html',
})
export class LiverComponent {
  public liverForm: FormGroup;
  private formMetadata: FormMetadata[];
  public constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
  ) {
    this.liverForm = this.fb.group({
      modality: [''],
      numberOfCtDetectors: [0],
      mriFieldStrength: [''],
      radiationDose: [''],
      typeOfContrastAgent: [''],
      otherTechnicalDetails: [''],
      technicalQualityAdequate: [''],
      reasonNo: [''],
      useOfVascularSubtraction: [''],
      purposeOfVascularSubtraction: [''],
      riskFactorsForHhc: this.fb.group({
        cirrhosis: [false],
        hbv: [false],
        currentHcc: [false],
      }),
      etiologyOfLiverDisease: [''],
      treatmentModalityHistory: [''],
      treatmentDate: [''],
      diagnosis: [''],
      dateOfPathology: [''],
      comparisonsText: [''],
      examModality: this.fb.group({
        ct: [false],
        mri: [false],
      }),
      typeOfContrast: [''],
      dateOfPriorExam: [''],
      featuresOfCirrhosis: [''],
      steatosis: [''],
      siderosis: [''],
      postsurgicalChanges: [''],
      postsurgicalChangesDescription: [''],
      observation: [''],
      observationNumber: [0],
      segmentLocation: this.fb.group({
        i: [false],
        ii: [false],
        iii: [false],
        iva: [false],
        ivb: [false],
        v: [false],
        vi: [false],
        vii: [false],
        viii: [false],
      }),
      sizeInCm: [0],
      sizeInMm: [0],
      imageIdNumber: [0],
      seriesNumber: [0],
      tumorInVein: [''],
      lrmFeatures: [''],
      lrmEtiology: [''],
      nonrimAphe: [''],
      thresholdGrowth: [''],
      washout: [''],
      enhancingCapsule: [''],
      ancillaryFeatures: [''],
      favoringBenignity: [''],
      favoringBenignityText: [''],
      favoringMalignancy: [''],
      favoringMalignancyText: [''],
      favoringHccInParticular: [''],
      favoringHccInParticularText: [''],
      treatedObservation: [''],
      sizeOfEquivocalOrViableTumor: [0],
      pretreatmentLrCategoryAndSize: [''],
      treatmentModality: [''],
      interimChange: [''],
      uniqueIdentifier: [''],
      overallSize: [''],
      location: '',
      imagingFeatures: [''],
      vascular: [''],
      biliary: [''],
      signsOfPortalHypertension: [''],
      extraHepaticFindings: [''],
      liradsCategoryPerObservation: [''],
      observationNumber1: [0],
      liradsCategoryInAggregate: [''],
      observationNumber2: [0],
      liradsTreatmentResponseCategoryPerObservation: [''],
      observationNumber3: [0],
      hccRadiologicTStage: [''],
      observationNumber4: [0],
      followUp: [''],
    });
    this.formMetadata = [
      { name: '', label: 'Procedure Information', type: 'text' },
      { name: 'modality', label: 'Modality', type: 'text' },
      {
        name: 'numberOfCtDetectors',
        label: 'Number of CT detectors',
        type: 'text',
      },
      { name: 'mriFieldStrength', label: 'MRI field strength', type: 'text' },
      { name: 'radiationDose', label: 'Radiation dose', type: 'text' },
      {
        name: 'typeOfContrastAgent',
        label: 'Type of contrast agent',
        type: 'text',
      },
      {
        name: 'otherTechnicalDetails',
        label: 'Other technical details',
        type: 'text',
      },
      {
        name: 'technicalQualityAdequate',
        label: 'Technical quality adequate',
        type: 'text',
      },
      { name: 'reasonNo', label: 'If no, describe reason', type: 'text' },
      {
        name: 'useOfVascularSubtraction',
        label: 'Use of vascular subtraction',
        type: 'text',
      },
      {
        name: 'purposeOfVascularSubtraction',
        label: 'Purpose of vascular subtraction',
        type: 'text',
      },
      { name: '', label: 'Clinical Information', type: 'text' },
      {
        name: 'riskFactorsForHhc',
        label: 'Risk factors for HCC',
        type: 'checkbox',
      },
      {
        name: 'etiologyOfLiverDisease',
        label: 'Etiology of liver disease',
        type: 'text',
      },
      { name: '', label: 'Treatment History', type: 'text' },

      {
        name: 'treatmentModalityHistory',
        label: 'Treatment modality',
        type: 'text',
      },
      { name: 'treatmentDate', label: 'Treatment date(s)', type: 'text' },
      { name: '', label: 'Pathology', type: 'text' },
      { name: 'diagnosis', label: 'Diagnosis', type: 'text' },
      { name: 'dateOfPathology', label: 'Date of pathology', type: 'text' },
      { name: '', label: 'Comparison', type: 'text' },
      { name: 'comparisonsText', label: 'Text:', type: 'text' },
      { name: 'examModality', label: 'Exam modality', type: 'checkbox' },
      { name: 'typeOfContrast', label: 'Type of contrast', type: 'text' },
      { name: 'dateOfPriorExam', label: 'Date of prior exam', type: 'text' },
      { name: '', label: 'Findings', type: 'text' },
      {
        name: 'featuresOfCirrhosis',
        label: 'Features of cirrhosis',
        type: 'text',
      },
      { name: 'steatosis', label: 'Steatosis', type: 'text' },
      { name: 'siderosis', label: 'Siderosis', type: 'text' },
      {
        name: 'postsurgicalChanges',
        label: 'Postsurgical changes',
        type: 'text',
      },
      {
        name: 'postsurgicalChangesDescription',
        label: 'Postsurgical changes description',
        type: 'text',
      },
      { name: 'observation', label: 'Observation', type: 'text' },
      { name: 'observationNumber', label: 'Observation number', type: 'text' },
      { name: 'segmentLocation', label: 'Segment location', type: 'checkbox' },
      { name: 'sizeInCm', label: 'Size in cm', type: 'text' },
      { name: 'sizeInMm', label: 'Size in mm', type: 'text' },
      { name: 'imageIdNumber', label: 'Image ID number', type: 'text' },
      { name: 'seriesNumber', label: 'Series number', type: 'text' },
      { name: 'tumorInVein', label: 'Tumor in vein', type: 'text' },
      { name: 'lrmFeatures', label: 'LR-M features', type: 'text' },
      { name: 'lrmEtiology', label: 'LR-M etiology', type: 'text' },
      { name: 'nonrimAphe', label: 'Nonrim APHE', type: 'text' },
      { name: 'thresholdGrowth', label: 'Threshold growth', type: 'text' },
      { name: 'washout', label: 'Washout', type: 'text' },
      { name: 'enhancingCapsule', label: 'Enhancing capsule', type: 'text' },
      { name: 'ancillaryFeatures', label: 'Ancillary features', type: 'text' },
      { name: 'favoringBenignity', label: 'Favoring benignity', type: 'text' },
      {
        name: 'favoringBenignityText',
        label: 'Favoring benignity',
        type: 'text',
      },
      {
        name: 'favoringMalignancy',
        label: 'Favoring malignancy',
        type: 'text',
      },
      {
        name: 'favoringHccInParticular',
        label: 'Favoring HCC in particular',
        type: 'text',
      },
      {
        name: 'favoringHccInParticularText',
        label: 'Favoring HCC in particular',
        type: 'text',
      },
      {
        name: 'treatedObservation',
        label: 'Treated observation',
        type: 'text',
      },
      {
        name: 'sizeOfEquivocalOrViableTumor',
        label: 'Size of equivocal or viable tumor',
        type: 'text',
      },
      {
        name: 'pretreatmentLrCategoryAndSize',
        label: 'Pretreatment LR category and size',
        type: 'text',
      },
      { name: 'treatmentModality', label: 'Treatment modality', type: 'text' },
      { name: 'interimChange', label: 'Interim change', type: 'text' },
      { name: 'uniqueIdentifier', label: 'Unique identifier', type: 'text' },
      { name: 'overallSize', label: 'Overall size', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'imagingFeatures', label: 'Imaging features', type: 'text' },
      { name: 'vascular', label: 'Vascular', type: 'text' },
      { name: 'biliary', label: 'Biliary', type: 'text' },
      {
        name: 'signsOfPortalHypertension',
        label: 'Signs of portal hypertension',
        type: 'text',
      },
      {
        name: 'extraHepaticFindings',
        label: 'Extra-hepatic findings',
        type: 'text',
      },
      {
        name: 'liradsCategoryPerObservation',
        label: 'LI-RADS category per observation',
        type: 'text',
      },
      { name: 'observationNumber1', label: 'Observation number', type: 'text' },
      {
        name: 'liradsCategoryInAggregate',
        label: 'LI-RADS category in aggregate',
        type: 'text',
      },
      { name: 'observationNumber2', label: 'Observation number', type: 'text' },
      {
        name: 'liradsTreatmentResponseCategoryPerObservation',
        label: 'LI-RADS treatment response category per observation',
        type: 'text',
      },
      { name: 'observationNumber3', label: 'Observation number', type: 'text' },
      {
        name: 'hccRadiologicTStage',
        label: 'HCC radiologic T-stage',
        type: 'text',
      },
      { name: 'observationNumber4', label: 'Observation number', type: 'text' },
      {
        name: 'followUp',
        label: 'Management and follow-up recommendations',
        type: 'text',
      },
    ];
  }

  public handleAction(type: string): void {
    const formData: BodyReport[] = [];
    this.formMetadata.forEach((field) => {
      if (field.type === 'checkbox') {
        const selectedValuesObj = this.liverForm.get(field.name)?.value;

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
          value: this.liverForm.get(field.name)?.value,
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
          a.download = 'liver' + '.html';
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
          a.download = 'liver' + '.pdf';
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
