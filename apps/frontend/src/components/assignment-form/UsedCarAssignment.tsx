import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UsedCarForm } from '@shared/index.js';
import { initialUsedCarForm } from './initialUsedCarForm.js';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import { submitAssignment, editAssignment } from '../../reducers/assignmentReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import VehiclePdfUpload from './VehiclePdfUpload.js';
import BasinInfo from './BasinInfo.js';
import ElectricCar from './ElectricCar.js';
import Service from './Service.js';
import Tyres from './Tyres.js';
import OtherService from './OtherService.js';
import BodyWork from './BodyWork.js';

import Button from '../uiComponents/Button.js';

import './UsedCarAssignment.css';

interface UsedCarAssignmentProps {
  assignment?: UsedCarForm;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsedCarAssignment: React.FC<UsedCarAssignmentProps> = ({ assignment, edit, setEdit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UsedCarForm>(initialUsedCarForm);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (edit && assignment) {
      setFormData(assignment);
    }
  }, [edit, assignment]);

  const handleChange = (field: keyof UsedCarForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    const confirmed = window.confirm('Haluatko varmasti tyhjentää lomakkeen?');
    if (confirmed) {
      setFormData(initialUsedCarForm);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    await dispatch(submitAssignment(formData));
    navigate('/toimeksiannot');
  };

  const handleEdit = async () => {
    if (!formData) return;
    await dispatch(editAssignment(formData));
    if (setEdit) setEdit(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Toimeksianto-lomake</h1>
      <div>
        <VehiclePdfUpload formData={formData} setFormData={setFormData} />
        <BasinInfo formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <ElectricCar formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Tyres formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Service formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <OtherService formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <BodyWork formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <div className="form-section-title buttons">
          <Button variant="danger" type="button" onClick={resetForm}>
            Tyhjennä lomake
          </Button>
          {!edit && (
            <Button variant="primary" type="submit">
              Lähetä toimeksianto
            </Button>
          )}
          {edit && setEdit && (
            <>
              <Button variant="danger" type="button" onClick={() => setEdit(false)}>
                Peruuta
              </Button>
              <Button variant="primary" type="button" onClick={() => handleEdit()}>
                Muokkaa toimeksiantoa
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default UsedCarAssignment;
