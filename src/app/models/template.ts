export class Template {
  public constructor(
    public id: number,
    public name: string,
    public sections: { [p: string]: string },
  ) {}
}
