import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useRedux.js';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import {
  submitPaintAssignment,
  updatePaintAssignment,
  fetchPaintAssignment,
} from '../../reducers/assignmentReducer.js';

import type { PaintForm, Step } from '../../../../../packages/shared/src/index.js';
import { initialPaintForm } from './initialPaintForm.js';

import CarTop from './CarTop.js';
import CarLeft from './CarLeft.js';
import CarRight from './CarRight.js';
import CarFront from './CarFront.js';
import CarRear from './CarRear.js';

import Button from '../uiComponents/Button.js';

import './PaintAssignment.css';

interface PaintAssignmentProps {
  regNro?: string;
  assignmentId?: number;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setStep?: React.Dispatch<React.SetStateAction<Step>>;
}

const PaintAssignment: React.FC<PaintAssignmentProps> = ({
  assignmentId,
  regNro,
  edit,
  setEdit,
  setStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const paintAssignment = useAppSelector((state) => state.assignment.paintAssignment);

  const { id: routeId } = useParams<{ id: string }>();

  const currentAssignmentId = assignmentId ?? (Number(routeId) || 0);
  const currentRegNro = regNro || '';

  const [formData, setFormData] = useState<PaintForm>({
    ...initialPaintForm,
    regNum: currentRegNro,
    assignmentId: currentAssignmentId,
  });
  const [originalData, setOriginalData] = useState<PaintForm>(formData);

  /**
   * --------------------------------------------------
   * FETCH ASSIGNMENT WHEN EDIT MODE STARTS
   * --------------------------------------------------
   */
  useEffect(() => {
    if (currentAssignmentId > 0) {
      dispatch(fetchPaintAssignment(currentAssignmentId));
    }
  }, [currentAssignmentId, dispatch]);

  useEffect(() => {
    if (
      currentAssignmentId > 0 &&
      paintAssignment?.id &&
      Number(paintAssignment.id) === currentAssignmentId
    ) {
      setFormData(paintAssignment);
      setOriginalData(paintAssignment);
    }
  }, [paintAssignment, currentAssignmentId]);

  useEffect(() => {
    if (currentAssignmentId > 0 && paintAssignment?.assignmentId === currentAssignmentId) {
      console.log('Päivitetään formData');

      setFormData(paintAssignment);
      setOriginalData(paintAssignment);
    }
  }, [paintAssignment, currentAssignmentId]);

  console.log('URL ID:', routeId);
  console.log('Current ID:', currentAssignmentId);
  console.log('Redux paintAssignment:', paintAssignment);

  /**
   * --------------------------------------------------
   * WHEN REDUX DATA ARRIVES → FILL FORM
   * --------------------------------------------------
   */
  useEffect(() => {
    if (edit && paintAssignment.id != undefined) {
      setFormData(paintAssignment);
      setOriginalData(paintAssignment);
    }
  }, [paintAssignment, edit]);

  /**
   * --------------------------------------------------
   * CHANGE DETECTION (DEEP COMPARE)
   * --------------------------------------------------
   */
  const isChanged = useMemo(() => {
    return JSON.stringify(originalData) !== JSON.stringify(formData);
  }, [originalData, formData]);

  /**
   * --------------------------------------------------
   * HANDLERS
   * --------------------------------------------------
   */

  const handleReturn = (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (isChanged) {
      const confirmed = window.confirm(
        'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
      );

      if (!confirmed) return;
    }

    if (setStep) {
      setStep('form');
    } else {
      navigate('/toimeksiannot');
    }

    setFormData(initialPaintForm);
  };

  const handleClose = (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (isChanged) {
      const confirmed = window.confirm(
        'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
      );

      if (!confirmed) return;
    }

    if (edit) {
      navigate('/toimeksiannot');
      setEdit?.(false);
    } else {
      navigate(-1);
    }
    setFormData(initialPaintForm);
  };

  const handlePrint = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    window.print();
  };

  const handleSubmitForm = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (!isChanged) return;

    try {
      const savedData = await dispatch(submitPaintAssignment(formData));

      if (savedData) {
        setFormData(savedData);
        setOriginalData(savedData);
      }
    } catch (error) {
      console.error('Maalauslomakkeen tallennus epäonnistui:', error);
    }
  };

  const handleEdit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (!isChanged) return;

    if (paintAssignment && paintAssignment.id) {
      await dispatch(updatePaintAssignment(formData));
    }

    // päivitetään baseline onnistuneen tallennuksen jälkeen
    setOriginalData(formData);
  };

  /**
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <div>
      <div className="a4-page">
        <form className="form-container paint" onSubmit={handleSubmitForm}>
          <div className="paint-headers">
            <h1 className="text-2xl font-bold">Maalauslomake</h1>
            <h2>Rekisteritunnus: {regNro ? regNro : formData.regNum}</h2>
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
          {!formData.id ? (
            <>
              <Button variant="danger" type="button" onClick={handleReturn}>
                Peruuta
              </Button>

              <Button variant="primary" type="button" onClick={handlePrint}>
                Tulosta
              </Button>

              <Button variant="primary" type="button" onClick={handleSubmitForm}>
                Tallenna
              </Button>
            </>
          ) : (
            <>
              <Button variant="danger" type="button" onClick={handleClose}>
                Sulje
              </Button>

              <Button variant="primary" type="button" onClick={handlePrint}>
                Tulosta
              </Button>

              <Button variant="primary" disabled={!isChanged} type="button" onClick={handleEdit}>
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
