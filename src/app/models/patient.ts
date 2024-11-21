export class Patient {
  public constructor(
    public id: string,
    public name: string,
    public dateOfBirth: Date,
    public gender: string,
    public phoneNumber: string,
    public address: string,
    public mothersMaidenName: string,
  ) {}
}
