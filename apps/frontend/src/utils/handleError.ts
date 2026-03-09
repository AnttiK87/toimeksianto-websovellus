import { isAxiosError } from 'axios';
import { showMessage } from '../reducers/messageReducer';
import { clearUser } from '../reducers/userReducer';

import type { AppDispatch } from '../reducers/store';
import type { NavigateFunction } from 'react-router-dom';

export const handleError = (
  error: unknown,
  dispatch: AppDispatch,
  navigate?: NavigateFunction,
): void => {
  console.log();
  if (!isAxiosError(error)) {
    console.error('Unknown error:', error);
    dispatch(
      showMessage(
        {
          text: 'Tuntematon virhe tapahtui.',
          type: 'error',
        },
        3,
      ),
    );
    return;
  }

  const status = error.response?.status;
  const data = error.response?.data;

  if (status === 400 && Array.isArray(data?.details)) {
    const fieldErrors = data.details
      .map((e: { field: string; message: string }) => `${e.field}: ${e.message}`)
      .join('\n');

    dispatch(
      showMessage(
        {
          text: fieldErrors,
          type: 'error',
        },
        5,
      ),
    );
    return;
  }
  if (status === 401) {
    localStorage.removeItem('loggedAdminUser');
    dispatch(clearUser());
    dispatch(
      showMessage(
        {
          text: data.message,
          type: 'error',
        },
        3,
      ),
    );
    if (navigate) {
      navigate('/');
    }
  } else {
    dispatch(
      showMessage(
        {
          text: data.message,
          type: 'error',
        },
        3,
      ),
    );
  }
};
