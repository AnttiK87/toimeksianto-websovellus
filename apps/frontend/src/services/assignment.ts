import api from './api.js';
import type {
  UsedCarForm,
  AssignmentResponse,
  PaintForm,
  BasicResponse,
  RepairPatch,
  editPatch,
} from '../../../../packages/shared/src/index.js';

const baseUrl = '/api/assignments';

const getAllAssignments = async (): Promise<UsedCarForm[]> => {
  const response = await api.get<UsedCarForm[]>(baseUrl);
  return response.data;
};

const getAssignmentById = async (id: Number): Promise<UsedCarForm> => {
  const response = await api.get<UsedCarForm>(`${baseUrl}/${id}`);
  return response.data;
};

const newAssignment = async (formData: UsedCarForm): Promise<AssignmentResponse> => {
  const response = await api.post<AssignmentResponse>(baseUrl, formData);
  return response.data;
};

const update = async (id: number, patch: editPatch[]): Promise<AssignmentResponse> => {
  const response = await api.patch<AssignmentResponse>(`${baseUrl}/${id}`, patch);
  return response.data;
};

const deleteAssignment = async (id: number): Promise<BasicResponse> => {
  const response = await api.delete<BasicResponse>(`${baseUrl}/${id}`);
  return response.data;
};

const getPaintAssignmentById = async (assignmentId: number): Promise<PaintForm> => {
  const response = await api.get<PaintForm>(`${baseUrl}/paint/${assignmentId}`);
  return response.data;
};

const newPaintAssignment = async (formData: PaintForm): Promise<PaintForm> => {
  console.log('lähtevä posti:', formData);

  const response = await api.post<PaintForm>(`${baseUrl}/paint`, formData);

  console.log('paluu posti:', response.data);

  return response.data;
};

const updatePaint = async (content: PaintForm): Promise<BasicResponse> => {
  const response = await api.put<BasicResponse>(
    `${baseUrl}/paint/${content.assignmentId}`,
    content,
  );
  return response.data;
};

const deletePaintAssignment = async (assignmentId: number): Promise<BasicResponse> => {
  const response = await api.delete<BasicResponse>(`${baseUrl}/paint/${assignmentId}`);
  return response.data;
};

const editRepairs = async (id: number, patch: RepairPatch[]): Promise<AssignmentResponse> => {
  const response = await api.patch<AssignmentResponse>(`${baseUrl}/repairs/${id}`, patch);
  return response.data;
};

const editLocation = async (id: number, patch: RepairPatch[]): Promise<AssignmentResponse> => {
  const response = await api.patch<AssignmentResponse>(`${baseUrl}/location/${id}`, patch);
  return response.data;
};

export default {
  getAllAssignments,
  getAssignmentById,
  newAssignment,
  update,
  getPaintAssignmentById,
  newPaintAssignment,
  updatePaint,
  editRepairs,
  deleteAssignment,
  deletePaintAssignment,
  editLocation,
};
