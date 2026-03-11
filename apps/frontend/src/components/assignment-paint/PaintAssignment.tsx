import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import { submitPaintAssignment, updatePaintAssignment } from '../../reducers/assignmentReducer.js';

import type { PaintForm } from '@shared/index.js';
import { initialPaintForm } from './initialPaintForm.js';

import CarTop from './CarTop.js';
import CarLeft from './CarLeft.js';
import CarRight from './CarRight.js';
import CarFront from './CarFront.js';
import CarRear from './CarRear.js';

import TextField from '../uiComponents/TextField.js';
import Button from '../uiComponents/Button.js';

import './PaintAssignment.css';

interface PaintAssignmentProps {
  regNro: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaintAssignment: React.FC<PaintAssignmentProps> = ({ regNro, edit, setEdit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PaintForm>(initialPaintForm);

  const resetForm = () => {
    const confirmed = window.confirm('Haluatko varmasti tyhjentää lomakkeen?');
    if (confirmed) {
      setFormData(initialPaintForm);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    if (!edit) {
      await dispatch(submitPaintAssignment(formData));
    } else {
      await dispatch(updatePaintAssignment(formData));
    }

    navigate('/toimeksiannot');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Maalaus-lomake</h1>
      <TextField
        label="Rek.nro"
        value={regNro}
        onChange={(v) => setFormData((prev) => ({ ...prev, regNum: v }))}
      />
      <CarTop formData={formData} setFormData={setFormData} />
      <CarLeft formData={formData} setFormData={setFormData} />
      <CarRight formData={formData} setFormData={setFormData} />
      <div className="front-and-rear">
        <CarFront formData={formData} setFormData={setFormData} />
        <CarRear formData={formData} setFormData={setFormData} />
      </div>
      <div>
        <div className="form-section-title buttons">
          <Button variant="danger" type="button" onClick={resetForm}>
            Tyhjennä lomake
          </Button>
          <Button variant="primary" type="submit">
            Tallenna ja tulosta lomake
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PaintAssignment;
