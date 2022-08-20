export class RegisterModel {
  public email?: string;
  public password?: string;
  public confirm?: string;

  public constructor(email?: string, password?: string, confirm?: string) {
    this.email = email;
    this.password = password;
    this.confirm = confirm;
  }
}

export class CredentialsModel {
  public email?: string;
  public password?: string;
  public type?: string;

  public constructor(email?: string, password?: string, type?: string) {
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

export class LoginModel {
  public email?: string;
  public password?: string;
  public type?: string;

  public constructor(email?: string, password?: string, type?: string) {
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

//"token" must be the same name as the response on the backend: LoginResDto
export class UserModel {
  public token?: string;
  public email?: string;
  public type?: string;

  public constructor(token?: string, email?: string, type?: string) {
    this.token = token;
    this.email = email;
    this.type = type;
  }
}
