import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userReducer.js';
import usersReducer from './usersReducer.js';
import messageReducer from './messageReducer.js';
import assignmentReducer from './assignmentReducer.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    message: messageReducer,
    assignment: assignmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
