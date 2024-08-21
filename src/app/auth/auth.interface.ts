export interface IUser {
  email: string;
  password: string;
  personal_data_access: boolean;
}

export interface AuthResponse {
  msg: string;
  data: {
    access_token: string;
    token_type: string;
    expires_at: number;
  };
}

export interface ErrorMessage {
  error: {
    error: {
      data: {
        msg: string;
      };
    };
  };
}
