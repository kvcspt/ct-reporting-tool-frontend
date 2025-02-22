export class Template {
  public constructor(
    public id: number,
    public name: string,
    public sections: { [p: string]: string },
  ) {}
}

export class FormMetadata {
  public constructor(
    public name: string,
    public label: string,
    public type: string,
  ) {}
}
