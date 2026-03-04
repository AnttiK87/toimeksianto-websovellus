export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

export interface UserInfoUpdateInput {
  name: string;
  email: string;
}

export interface PasswordChangeInput {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

export type UserUpdateResponse = {
  message: string;
  user: User;
};

export interface LoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
}

export interface LogoutResponse {
  message: string;
}
