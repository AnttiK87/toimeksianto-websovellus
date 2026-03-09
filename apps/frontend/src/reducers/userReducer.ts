import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users.js';
import loginService from '../services/login.js';
import { showMessage } from './messageReducer.js';
import { handleError } from '../utils/handleError.js';

import type { AppDispatch } from './store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import type {
  PasswordChangeInput,
  LoginResponse,
  UserInfoUpdateInput,
  LoginInput,
} from '@shared/index.js';

const storedUser = localStorage.getItem('loggedAdminUser');
let parsedUser: LoginResponse | null = null;
if (storedUser && storedUser != 'undefined') {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    console.error('Error while parsin user from localStorage:', error);
  }
}

let initialState: LoginResponse | null = null;

if (parsedUser) {
  initialState = {
    id: parsedUser.id,
    token: parsedUser.token,
    name: parsedUser.name,
    email: parsedUser.email,
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<LoginResponse>) {
      const user = action.payload;

      localStorage.setItem('loggedAdminUser', JSON.stringify(user));

      return user;
    },

    clearUser() {
      localStorage.removeItem('loggedAdminUser');
      return null;
    },

    updateUser(state, action) {
      if (state) {
        state.name = action.payload.name;
        state.email = action.payload.email;
        localStorage.setItem('loggedAdminUser', JSON.stringify(state));
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export const login = (content: LoginInput) => {
  return async (dispatch: AppDispatch) => {
    try {
      const loggedin = await loginService.login(content);
      console.log('Login successful:', loggedin);
      dispatch(setUser(loggedin));

      dispatch(
        showMessage(
          {
            text: `Tervetuloa ${loggedin.name}!`,
            type: 'success',
          },
          5,
        ),
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.log(error);
      handleError(error, dispatch);
    }
  };
};

export const logout = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const loggedOut = await loginService.logout(token);
      dispatch(clearUser());

      dispatch(
        showMessage(
          {
            text: `${loggedOut.message}!`,
            type: 'success',
          },
          5,
        ),
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      handleError(error, dispatch);
    }
  };
};

export const changePassword = (content: PasswordChangeInput) => {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedUser = await userService.changePassword(content);
      dispatch(updateUser(updatedUser.user));

      dispatch(
        showMessage(
          {
            text: `Salasana muutettu!`,
            type: 'success',
          },
          5,
        ),
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      handleError(error, dispatch);
    }
  };
};

export const updateUserInfo = (content: UserInfoUpdateInput) => {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedUser = await userService.updateInfo(content);
      dispatch(updateUser(updatedUser.user));

      dispatch(
        showMessage(
          {
            text: `Käyttäjän tiedot muutettu!`,
            type: 'success',
          },
          5,
        ),
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      handleError(error, dispatch);
    }
  };
};

export default userSlice.reducer;
