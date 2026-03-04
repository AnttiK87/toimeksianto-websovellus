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

  console.error('Axios error occurred:', error);

  const getLocalizedMessage = (): string => {
    if (Array.isArray(data?.message)) {
      return data.message
        .map((msg: { field: string; message: string }) => `${msg.field}: ${msg.message}`)
        .join('\n');
    }
    if (data?.message) {
      return data.message;
    }
    return error.message || 'An error occurred.';
  };

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
  if (status === 401 && data.messages === 'Väärä käyttäjätunnus tai salasana.') {
    localStorage.removeItem('loggedAdminUser');
    dispatch(clearUser());
    dispatch(
      showMessage(
        {
          text: 'Väärä käyttäjätunnus tai salasana.',
          type: 'error',
        },
        3,
      ),
    );
  } else if (status === 401) {
    localStorage.removeItem('loggedAdminUser');
    dispatch(clearUser());
    dispatch(
      showMessage(
        {
          text: 'Kirjaudu uudelleen sisään.',
          type: 'error',
        },
        3,
      ),
    );
    if (navigate) {
      navigate('/kirjaudu');
    }
  } else {
    dispatch(
      showMessage(
        {
          text: getLocalizedMessage(),
          type: 'error',
        },
        3,
      ),
    );
  }
};
