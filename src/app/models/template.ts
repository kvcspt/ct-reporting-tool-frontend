export class Template {
  public constructor(
    public id: number,
    public name: string,
    public sections: { [p: string]: string },
  ) {}
}

export class BodyTemplateElement {
  public constructor(
    public label: string,
    public name: string,
    public type: string,
    public options?: string[],
  ) {}
}

export class BodyTemplate {
  public constructor(
    public title: string,
    public bodyTemplateElementDTOs: BodyTemplateElement[],
  ) {}
}

export class FormMetadata {
  public constructor(
    public name: string,
    public label: string,
    public type: string,
  ) {}
}
