import axios from 'axios';
import loginService from './login';
import type {
  User,
  PasswordChangeInput,
  UserInfoUpdateInput,
  UserUpdateResponse,
} from '@shared/index.js';

const baseUrl = '/api/users';

const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(baseUrl);
  return response.data;
};

const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${baseUrl}/${id}`);
  return response.data;
};

const changePassword = async (content: PasswordChangeInput): Promise<UserUpdateResponse> => {
  const token = loginService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    oldPassword: content.oldPassword,
    newPassword1: content.newPassword1,
    newPassword2: content.newPassword2,
  };

  const response = await axios.put<UserUpdateResponse>(
    `${baseUrl}/changePassword`,
    newObject,
    config,
  );
  return response.data;
};

const updateInfo = async (content: UserInfoUpdateInput): Promise<UserUpdateResponse> => {
  const token = loginService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    name: content.name,
    email: content.email,
  };

  const response = await axios.put<UserUpdateResponse>(`${baseUrl}/updateInfo`, newObject, config);
  return response.data;
};

export default {
  getAll,
  getUserById,
  changePassword,
  updateInfo,
};
