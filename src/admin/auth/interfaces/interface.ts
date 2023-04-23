export interface signinBody {
  email_address: string;
  password?: string;
  _id: string;
  name: string;
  user?: any;
  access_token?: string;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
export interface Login_Type {
  facebook: string;
  google: string;
  others: string;
}
