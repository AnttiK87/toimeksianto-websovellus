import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userReducer.js';
import messageReducer from './messageReducer.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
