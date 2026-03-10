import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import assignmentService from '../services/assignment.js';
import { showMessage } from './messageReducer.js';
import { handleError } from '../utils/handleError.js';
import type { AppDispatch } from './store';
import type { AxiosError } from 'axios';
import type { UsedCarForm, AssignmentResponse, PaintForm } from '@shared/index.js';

interface AssignmentState {
  allAssignments: UsedCarForm[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  allAssignments: [],
  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    setAssignments(state, action: PayloadAction<UsedCarForm[]>) {
      state.allAssignments = action.payload;
    },
    appendAssignment(state, action: PayloadAction<UsedCarForm>) {
      state.allAssignments.push(action.payload);
    },
    updateAssignment(state, action: PayloadAction<UsedCarForm>) {
      const updatedAssignment = action.payload;
      state.allAssignments = state.allAssignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment,
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setAssignments, appendAssignment, updateAssignment, setLoading, setError } =
  assignmentSlice.actions;

// Hae kaikki lomakkeet
export const fetchAllAssignments = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await assignmentService.getAllAssignments();
      if (data.length > 0) dispatch(setAssignments(data));
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

// Lähetä uusi lomake
export const submitAssignment = (formData: UsedCarForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response: AssignmentResponse = await assignmentService.newAssignment(formData);
      if (response.data) {
        dispatch(appendAssignment(response.data));
      }

      dispatch(
        showMessage(
          {
            text: 'Toimeksianto tallennettu onnistuneesti!',
            type: 'success',
          },
          5,
        ),
      );
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const editAssignment = (formData: UsedCarForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response: AssignmentResponse = await assignmentService.update(formData);
      if (response.data) {
        dispatch(updateAssignment(response.data));
      }

      dispatch(
        showMessage(
          {
            text: 'Toimeksianto päivitetty onnistuneesti!',
            type: 'success',
          },
          5,
        ),
      );
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const submitPaintAssignment = (formData: PaintForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      dispatch(
        showMessage(
          {
            text: 'Toimeksianto tallennettu onnistuneesti!',
            type: 'success',
          },
          5,
        ),
      );
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const updatePaintAssignment = (formData: PaintForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      dispatch(
        showMessage(
          {
            text: 'Toimeksianto päivitetty onnistuneesti!',
            type: 'success',
          },
          5,
        ),
      );
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export default assignmentSlice.reducer;
