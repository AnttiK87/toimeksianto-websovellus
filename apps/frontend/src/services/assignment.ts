import axios from 'axios';
import type { UsedCarForm, AssignmentResponse } from '@shared/index.js';

const baseUrl = '/api/assignments';

const getAllAssignments = async (): Promise<UsedCarForm[]> => {
  const response = await axios.get<UsedCarForm[]>(baseUrl);
  return response.data;
};

const getAssignmentByRegNro = async (regNro: string): Promise<UsedCarForm> => {
  const response = await axios.get<UsedCarForm>(`${baseUrl}/${regNro}`);
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

export default { getAllAssignments, getAssignmentByRegNro, newAssignment, update };
