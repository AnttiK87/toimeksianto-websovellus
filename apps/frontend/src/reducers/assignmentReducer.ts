import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import assignmentService from '../services/assignment.js';
import { showMessage } from './messageReducer.js';
import { handleError } from '../utils/handleError.js';
import type { AppDispatch } from './store';
import type { AxiosError } from 'axios';
import { initialUsedCarForm } from '../components/assignment-form/initialUsedCarForm.js';
import { initialPaintForm } from '../components/assignment-paint/initialPaintForm.js';
import type {
  UsedCarForm,
  AssignmentResponse,
  PaintForm,
  RepairPatch,
  editPatch,
} from '../../../../packages/shared/src/index';

interface AssignmentState {
  allAssignments: UsedCarForm[];
  savedAssignment: UsedCarForm;
  selectedAssignment: UsedCarForm;
  paintAssignment: PaintForm;
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  allAssignments: [],
  savedAssignment: initialUsedCarForm,
  selectedAssignment: initialUsedCarForm,
  paintAssignment: initialPaintForm,
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
    setSavedAssignment(state, action: PayloadAction<UsedCarForm>) {
      state.savedAssignment = action.payload;
    },
    setAssignment(state, action: PayloadAction<UsedCarForm>) {
      state.selectedAssignment = action.payload;
    },
    setPaintAssignment(state, action: PayloadAction<PaintForm>) {
      state.paintAssignment = action.payload;
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
    deleteAssignment(state, action: PayloadAction<UsedCarForm>) {
      state.allAssignments = state.allAssignments.filter(
        (assignment) => assignment.id !== action.payload.id,
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

export const {
  setAssignments,
  setSavedAssignment,
  appendAssignment,
  updateAssignment,
  deleteAssignment,
  setLoading,
  setError,
  setPaintAssignment,
  setAssignment,
} = assignmentSlice.actions;

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

export const fetchAssignment = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await assignmentService.getAssignmentById(id);
      if (data) dispatch(setAssignment(data));
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const fetchPaintAssignment = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await assignmentService.getPaintAssignmentById(id);
      if (data) dispatch(setPaintAssignment(data));
      else if (data === null) dispatch(setPaintAssignment(initialPaintForm));
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const submitAssignment = (formData: UsedCarForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response: AssignmentResponse = await assignmentService.newAssignment(formData);
      if (response.data) {
        dispatch(appendAssignment(response.data));
        dispatch(setSavedAssignment(response.data));
      }

      dispatch(
        showMessage(
          {
            text: 'Toimeksianto tallennettu onnistuneesti!',
            type: 'success',
          },
          3,
        ),
      );
      dispatch(setLoading(false));
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const editAssignment = (id: number, patch: editPatch[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await assignmentService.update(id, patch);
      if (response.data) {
        //console.log(response.data);
        dispatch(updateAssignment(response.data));
        dispatch(setSavedAssignment(response.data));
      }
      if (
        response.data?.bodyWarranty.enabled === false ||
        response.data?.damage.damaged === false
      ) {
        dispatch(
          showMessage(
            {
              text: 'Toimeksianto päivitetty onnistuneesti!',
              type: 'success',
            },
            3,
          ),
        );
      }
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const removeAssignrment = (assignment: UsedCarForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (assignment.id) {
        const deletedAssignment = await assignmentService.deleteAssignment(assignment.id);
        dispatch(deleteAssignment(assignment));

        dispatch(
          showMessage(
            {
              text: deletedAssignment.message,
              type: 'success',
            },
            1,
          ),
        );
      }
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 404) {
        dispatch(deleteAssignment(assignment));
      }
    }
  };
};

export const submitPaintAssignment = (formData: PaintForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await assignmentService.newPaintAssignment(formData);
      dispatch(
        showMessage(
          {
            text: 'Maalauslomake tallennettu!',
            type: 'success',
          },
          3,
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
      await assignmentService.updatePaint(formData);
      dispatch(
        showMessage(
          {
            text: 'Maalauslomake päivitetty!',
            type: 'success',
          },
          3,
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

export const editRepairs = (id: number, patch: RepairPatch[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await assignmentService.editRepairs(id, patch);
      if (response.data) {
        //console.log(response.data);
        dispatch(updateAssignment(response.data));
        dispatch(setAssignment(response.data));
      }
      dispatch(setLoading(false));
    } catch (err: unknown) {
      const error = err as AxiosError;
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      handleError(error, dispatch);
    }
  };
};

export const editLocation = (id: number, patch: RepairPatch[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await assignmentService.editLocation(id, patch);
      if (response.data) {
        //console.log(response.data);
        dispatch(updateAssignment(response.data));
        dispatch(setAssignment(response.data));
        dispatch(
          showMessage(
            {
              text: response.message,
              type: 'success',
            },
            1,
          ),
        );
      }
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
