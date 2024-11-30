import { Patient } from './patient';

export class Scan {
  public constructor(
    public id: number,
    public modality: string,
    public scanDate: Date,
    public description: string,
    public bodyPart: string,
    public patient: Patient,
    public performer: string,
    public resultsInterpreter: string,
    public studyUid: string,
    public seriesUid: string,
  ) {}
}
