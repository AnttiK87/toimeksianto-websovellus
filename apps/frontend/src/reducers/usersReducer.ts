import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users.js';
import { AppDispatch } from './store';

const usersSlice = createSlice({
  name: 'users',

  initialState: {
    salesUsers: [],
  },

  reducers: {
    setSalesUsers(state, action) {
      state.salesUsers = action.payload;
    },
  },
});

export const { setSalesUsers } = usersSlice.actions;

export const fetchSalesUsers = () => {
  return async (dispatch: AppDispatch) => {
    const users = await userService.getSalesUsers();

    dispatch(setSalesUsers(users));
  };
};

export default usersSlice.reducer;
