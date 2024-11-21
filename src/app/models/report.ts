import { Patient } from './patient';
import { User } from '../auth/model/user';
import { Template } from './template';

export class Report {
  public constructor(
    public id: number,
    public title: string,
    public createdDate: Date,
    public patient: Patient,
    public createdBy: User,
    public template: Template,
    public sections: { [p: string]: string },
  ) {}
}
