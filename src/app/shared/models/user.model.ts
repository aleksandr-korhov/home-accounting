export interface IUser {
  email: string;
  password: string;
  name: string;
  id?: number;
}

export class User implements IUser {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public id?: number
  ) {}
}
