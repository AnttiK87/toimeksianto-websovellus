import axios from 'axios';
import type { UsedCarForm, AssignmentResponse, PaintForm, BasicResponse } from '@shared/index.js';

const baseUrl = '/api/assignments';

const getAllAssignments = async (): Promise<UsedCarForm[]> => {
  const response = await axios.get<UsedCarForm[]>(baseUrl);
  return response.data;
};

const getAssignmentById = async (id: Number): Promise<UsedCarForm> => {
  const response = await axios.get<UsedCarForm>(`${baseUrl}/${id}`);
  return response.data;
};

const newAssignment = async (formData: UsedCarForm): Promise<AssignmentResponse> => {
  const response = await axios.post<AssignmentResponse>(baseUrl, formData);
  return response.data;
};

const update = async (content: UsedCarForm): Promise<AssignmentResponse> => {
  const response = await axios.put<AssignmentResponse>(`${baseUrl}/${content.id}`, content);
  return response.data;
};

const getPaintAssignmentById = async (assignmentId: number): Promise<PaintForm> => {
  const response = await axios.get<PaintForm>(`${baseUrl}/paint/${assignmentId}`);
  return response.data;
};

const newPaintAssignment = async (formData: PaintForm): Promise<BasicResponse> => {
  const response = await axios.post<BasicResponse>(`${baseUrl}/paint`, formData);
  return response.data;
};

const updatePaint = async (content: PaintForm): Promise<BasicResponse> => {
  console.log('update');
  const response = await axios.put<BasicResponse>(
    `${baseUrl}/paint/${content.assignmentId}`,
    content,
  );
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
};
