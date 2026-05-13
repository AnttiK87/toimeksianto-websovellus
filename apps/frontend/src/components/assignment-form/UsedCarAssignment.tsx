import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UsedCarForm, Step, editPatch } from '../../../../../packages/shared/src/index.js';
import { initialUsedCarForm } from './initialUsedCarForm.js';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useRedux.js';
import type { AppDispatch } from '../../reducers/store.js';
import {
  submitAssignment,
  editAssignment,
  setSavedAssignment,
  fetchPaintAssignment,
} from '../../reducers/assignmentReducer.js';
import { fetchSalesUsers } from '../../reducers/usersReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';
import assignmentService from '../../services/assignment.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import VehiclePdfUpload from './VehiclePdfUpload.js';
import BasinInfo from './BasinInfo.js';
import ElectricCar from './ElectricCar.js';
import Service from './Service.js';
import Tyres from './Tyres.js';
import OtherService from './OtherService.js';
import BodyWork from './BodyWork.js';
import AdditionalInfo from './AdditionalInfo.js';
import PaintAssignment from '../assignment-paint/PaintAssignment.js';

import Button from '../uiComponents/Button.js';

import { createPatches, applyPatchToObject } from '../../utils/handleChange.js';

import './UsedCarAssignment.css';

interface UsedCarAssignmentProps {
  assignment?: UsedCarForm;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsedCarAssignment: React.FC<UsedCarAssignmentProps> = ({ assignment, edit, setEdit }) => {
  console.log(assignment, edit, setEdit);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const salesUsers = useAppSelector((state) => state.users.salesUsers);

  useEffect(() => {
    dispatch(fetchSalesUsers());
  }, [dispatch]);

  useEffect(() => {
    if (edit && assignment) {
      setFormData(assignment);
      dispatch(setSavedAssignment(assignment));
      if (assignment.id) {
        dispatch(fetchPaintAssignment(assignment.id));
      }
    }
  }, [edit, assignment]);

  const [originalData, setOriginalData] = useState(assignment);

  useEffect(() => {
    setOriginalData(assignment);
  }, [assignment]);

  const resetForm = () => {
    const confirmed = window.confirm('Haluatko varmasti tyhjentää lomakkeen?');
    if (confirmed) {
      setFormData(initialUsedCarForm);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData) return;

    await dispatch(submitAssignment(formData));

    if (paint) {
      setStep('paint');
    } else {
      navigate('/toimeksiannot');
    }
  };

  const handleChange = (path: string, value: unknown) => {
    setFormData((prev) => applyPatchToObject(prev, path, value));
  };

  const handleEdit = async () => {
    if (!assignment) return;
    if (!setEdit) return;
    if (!assignment.id) return;

    const patches = createPatches(originalData, formData);
    if (patches.length === 0) return;

    console.log('lähetetään patchit', patches);
    await dispatch(editAssignment(assignment.id, patches));
    if (!paint && paintAssignment.id) {
      await assignmentService.deletePaintAssignment(assignment.id);
    }
    setPatches([]);
    if (!paint) {
      setEdit(false);
    } else if (paint && !paintAssignment.id) {
      setStep('paint');
    }
  };

  const handlePaint = async () => {
    console.log(patches);
    if (!assignment) return;
    if (!assignment.id) return;
    if (patches.length === 0) setStep('paint');
    else if (patches.length > 0 && setEdit) {
      const confirmed = window.confirm(
        'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
      );
      if (confirmed) {
        setStep('paint');
      }
    }
  };

  const close = () => {
    if (patches.length === 0 && setEdit) {
      setEdit(false);
    } else if (patches.length > 0 && setEdit) {
      const confirmed = window.confirm(
        'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
      );
      if (confirmed) {
        setEdit(false);
      }
    }
  };

  if (paint && step === 'paint' && savedAssignment && savedAssignment.id) {
    return (
      <PaintAssignment
        regNro={savedAssignment.regNum}
        assignmentId={savedAssignment.id}
        edit={edit}
        setEdit={setEdit}
        setStep={setStep}
      />
    );
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="same-row-repair">
        <h1 className="text-2xl font-bold">Toimeksianto-lomake</h1>
        {edit && <FontAwesomeIcon className="close-icon" onClick={() => close()} icon={faX} />}
      </div>
      <div>
        <VehiclePdfUpload formData={formData} setFormData={setFormData} />
        <BasinInfo formData={formData} handleChange={handleChange} salesUsers={salesUsers} />
        <ElectricCar formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Tyres formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Service formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <OtherService formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <BodyWork formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <AdditionalInfo formData={formData} handleChange={handleChange} />
        <div className="form-section-title buttons">
          {!edit && (
            <Button variant="danger" type="button" onClick={resetForm}>
              Tyhjennä lomake
            </Button>
          )}
          {!edit && (
            <Button variant="primary" type="submit">
              {paint ? 'Tallenna ja siirry maalaus lomakkelle' : 'Tallenna toimeksianto'}
            </Button>
          )}
          {edit && setEdit && (
            <>
              <Button variant="danger" type="button" onClick={() => close()}>
                Sulje
              </Button>
              {paint && paintAssignment.id && (
                <Button variant="primary" type="button" onClick={() => handlePaint()}>
                  Muokkaa maalauslomaketta
                </Button>
              )}
              <Button variant="primary" type="button" onClick={() => handleEdit()}>
                {paint && !paintAssignment.id
                  ? 'Tallenna ja siirry maalaus lomakkelle'
                  : 'Tallenna'}
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default UsedCarAssignment;
