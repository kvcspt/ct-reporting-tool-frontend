export class User {
  private id: number;
  private userName: string;
  private password: string;
  private name: string;
  private title: string;
  private role: string;

  constructor(id: number, userName: string, password: string, name: string, title: string, role: string) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.name = name;
    this.title = title;
    this.role = role;
  }

}
