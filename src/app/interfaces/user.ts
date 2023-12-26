export interface Response {
  status: boolean;
  message: string;
}

export interface ResponseRegister extends Response {
  type: string;
}

export interface ResponseLogin extends Response {
  token: string;
}
export interface ResponseData extends Response {
  data: {
    username: string;
    email: string;
  }
}
