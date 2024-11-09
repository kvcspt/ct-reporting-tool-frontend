export class Scan {
  public constructor(
    public id: number,
    public modality: string,
    public scanDate: Date,
    public description: string,
    public bodyPart: string,
    public patientId: number,
    public reportId: number | undefined,
  ) {}
}
