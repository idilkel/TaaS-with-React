import { TodoModel } from "./Todo";

export class UserTypeModel {
  public id?: number;
  public email?: string;
  public password?: string;
  public clientType?: string;
  public tasks?: TodoModel[];

  public constructor(
    id?: number,
    email?: string,
    password?: string,
    clientType?: string
    //tasks?: TodoModel[]
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.clientType = clientType;
    //this.tasks = TodoModel[];
  }
}
