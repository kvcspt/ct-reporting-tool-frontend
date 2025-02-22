import { Patient } from './patient';
import { User } from '../auth/model/user';
import { Template } from './template';
import { Lesion } from './lesion';
import { Scan } from './scan';

export class Report {
  public constructor(
    public id: number,
    public title: string,
    public createdDate: Date,
    public patient: Patient,
    public createdBy: User,
    public template: Template,
    public sections: { [p: string]: string },
    public scans: Scan[],
    public lesions: Lesion[],
  ) {}
}

export class BodyReport {
  public constructor(
    public name: string,
    public label: string,
    public type: string,
    public value: any,
  ) {}
}
