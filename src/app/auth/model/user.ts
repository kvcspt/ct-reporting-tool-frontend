export class User {
  public id: number;
  public username: string;
  public password: string;
  public name: string;
  public title: string;
  public role: string;

  public constructor(
    id: number,
    userName: string,
    password: string,
    name: string,
    title: string,
    role: string,
  ) {
    this.id = id;
    this.username = userName;
    this.password = password;
    this.name = name;
    this.title = title;
    this.role = role;
  }
}
