import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import { submitPaintAssignment, updatePaintAssignment } from '../../reducers/assignmentReducer.js';

import type { PaintForm } from '../../../../../packages/shared/src/index.js';
import { initialPaintForm } from './initialPaintForm.js';

import CarTop from './CarTop.js';
import CarLeft from './CarLeft.js';
import CarRight from './CarRight.js';
import CarFront from './CarFront.js';
import CarRear from './CarRear.js';

import Button from '../uiComponents/Button.js';

import './PaintAssignment.css';

interface PaintAssignmentProps {
  paintAssignment: PaintForm;
  regNro: string;
  assignmentId: number;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaintAssignment: React.FC<PaintAssignmentProps> = ({
  paintAssignment,
  assignmentId,
  regNro,
  edit,
  setEdit,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PaintForm>({
    ...paintAssignment,
    regNum: regNro,
    assignmentId: assignmentId,
  });

  const resetForm = () => {
    const confirmed = window.confirm('Haluatko varmasti tyhjentää lomakkeen?');
    if (confirmed) {
      setFormData(initialPaintForm);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = async (e?: React.SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!formData) return;

    await dispatch(submitPaintAssignment(formData));

    window.print();

    navigate('/toimeksiannot');
  };

  const handleEdit = async (e?: React.SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!formData) return;

    await dispatch(updatePaintAssignment(formData));

    window.print();

    navigate('/toimeksiannot');
    setEdit && setEdit(false);
  };

  return (
    <div>
      <div className="a4-page">
        <form className="form-container paint" onSubmit={handleSubmitForm}>
          <div className="paint-headers">
            <h1 className="text-2xl font-bold">Maalauslomake</h1>
            <h2>Rekisteritunnus: {regNro}</h2>
          </div>
          <div className="left-and-front">
            <CarLeft formData={formData} setFormData={setFormData} />
            <CarRear formData={formData} setFormData={setFormData} />
          </div>
          <div className="left-and-front">
            <CarRight formData={formData} setFormData={setFormData} />
            <CarFront formData={formData} setFormData={setFormData} />
          </div>
          <CarTop formData={formData} setFormData={setFormData} />
        </form>
      </div>
      <div className="no-print">
        <div className="form-section-title buttons">
          <Button variant="danger" type="button" onClick={resetForm}>
            Tyhjennä lomake
          </Button>
          {!edit && (
            <Button variant="primary" type="button" onClick={() => handleSubmitForm()}>
              Tallenna ja tulosta lomake
            </Button>
          )}{' '}
          {edit && setEdit && (
            <>
              <Button variant="danger" type="button" onClick={() => setEdit(false)}>
                Peruuta
              </Button>
              <Button variant="primary" type="button" onClick={() => handleEdit()}>
                Tallenna muutokset
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaintAssignment;
