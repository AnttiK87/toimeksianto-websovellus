import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UsedCarForm, Step, editPatch } from '@shared/dist/index.js';
import { initialUsedCarForm } from './initialUsedCarForm.js';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useRedux.js';
import type { AppDispatch } from '../../reducers/store.js';
import {
  submitAssignment,
  editAssignment,
  fetchPaintAssignment,
  setSavedAssignment,
} from '../../reducers/assignmentReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import VehiclePdfUpload from './VehiclePdfUpload.js';
import BasinInfo from './BasinInfo.js';
import ElectricCar from './ElectricCar.js';
import Service from './Service.js';
import Tyres from './Tyres.js';
import OtherService from './OtherService.js';
import BodyWork from './BodyWork.js';
import PaintAssignment from '../assignment-paint/PaintAssignment';

import Button from '../uiComponents/Button.js';

import { applyPatchToObject } from '../../utils/handleChange.js';

import './UsedCarAssignment.css';

interface UsedCarAssignmentProps {
  assignment?: UsedCarForm;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsedCarAssignment: React.FC<UsedCarAssignmentProps> = ({ assignment, edit, setEdit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UsedCarForm>(initialUsedCarForm);
  const [patches, setPatches] = useState<editPatch[]>([]);

  const paint = formData.damage.damaged || formData.bodyWarranty.enabled;

  const [step, setStep] = useState<Step>('form');

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const savedAssignment = useAppSelector((state) => state.assignment.savedAssignment);
  const paintAssignment = useAppSelector((state) => state.assignment.paintAssignment);

  useEffect(() => {
    if (edit && assignment) {
      setFormData(assignment);
      dispatch(setSavedAssignment(assignment));

      if ((assignment.damage.damaged || assignment.bodyWarranty.enabled) && assignment.id) {
        dispatch(fetchPaintAssignment(assignment.id));
      }
    }
  }, [edit, assignment]);

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

    if (formData.bodyWarranty.enabled || formData.damage.damaged) {
      setStep('paint');
    } else {
      navigate('/toimeksiannot');
    }
  };

  const handleChange = (path: string, value: unknown) => {
    // CREATE MODE
    if (!edit) {
      setFormData((prev) => applyPatchToObject(prev, path, value));
      return;
    }

    // EDIT MODE
    setPatches((prev) => {
      console.log(prev);
      const index = prev.findIndex((p) => p.path === path);

      console.log(index);

      if (index === -1) return [...prev, { path, value }];

      const next = [...prev];
      next[index] = { path, value };
      return next;
    });
  };

  const handleEdit = async () => {
    if (!formData) return;
    await dispatch(editAssignment(formData));
    if (
      (formData.bodyWarranty.enabled &&
        assignment?.bodyWarranty.enabled !== formData.bodyWarranty.enabled) ||
      (formData.damage.damaged && assignment?.damage.damaged !== formData.damage.damaged)
    ) {
      setStep('paint');
    } else {
      if (setEdit) setEdit(false);
    }
  };

  const handleEditAndPaint = async () => {
    if (!formData) return;
    await dispatch(editAssignment(formData));
    setStep('paint');
  };

  if (paint && step === 'paint' && savedAssignment.id) {
    return (
      <PaintAssignment
        paintAssignment={paintAssignment}
        regNro={savedAssignment.regNum}
        assignmentId={savedAssignment.id}
        edit={edit}
        setEdit={setEdit}
      />
    );
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Toimeksianto-lomake</h1>
      <div>
        <VehiclePdfUpload formData={formData} setFormData={setFormData} />
        <BasinInfo formData={formData} handleChange={handleChange} />
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
              {paint ? 'Tallenna ja siirry maalaus lomakkelle' : 'Tallenna toimeksianto'}
            </Button>
          )}
          {edit && setEdit && (
            <>
              <Button variant="danger" type="button" onClick={() => setEdit(false)}>
                Peruuta
              </Button>
              <Button variant="primary" type="button" onClick={() => handleEdit()}>
                Tallenna muutokset
              </Button>
              {paintAssignment.id && (
                <Button variant="primary" type="button" onClick={() => handleEditAndPaint()}>
                  Muokkaa maalauslomaketta
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default UsedCarAssignment;
