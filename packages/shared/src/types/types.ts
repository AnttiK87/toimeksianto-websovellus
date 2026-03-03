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

export interface passwordChangeInput {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}
