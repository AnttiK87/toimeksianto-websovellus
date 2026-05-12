import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import { editLocation } from '../../reducers/assignmentReducer.js';

import { locations } from '../../utils/formOptions.js';
import SelectField from '../uiComponents/SelectField.js';

import type { UsedCarForm, RepairPatch } from '../../../../../packages/shared/src/index.js';

import './QuickLocationEdit.css';

interface Props {
  show: boolean;
  closeLocationEdit: () => void;
  currentAssignment: UsedCarForm;
}

const QuickLocationEdit: React.FC<Props> = ({ show, closeLocationEdit, currentAssignment }) => {
  const [value, setValue] = useState(currentAssignment.location);
  const [changedLocation, setChangedLocation] = useState<RepairPatch[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    if (!changedLocation) return;

    if (!currentAssignment.id) return;

    await dispatch(editLocation(currentAssignment.id, changedLocation));
    setChangedLocation([]);
    closeLocationEdit();
  };

  return (
    <div className={`overlay ${show ? 'show' : ''}`}>
      <div className="overlayContent">
        <div>
          <h2 className="title-location">Vaihda ajoneuvon {currentAssignment.regNum} sijaintia</h2>
        </div>

        <div className="selectLocation">
          <SelectField
            label="Sijainti"
            options={locations}
            value={value}
            classSelect="location-select"
            classLabel="location-label"
            onChange={(v) => {
              setValue(v);
              setChangedLocation((prev) => {
                const filtered = prev.filter((p) => p.path !== 'location');

                return [
                  ...filtered,
                  {
                    path: 'location',
                    value: v,
                  },
                ];
              });
            }}
          />
        </div>

        <div className="buttons location-buttons">
          <Button variant="danger" onClick={() => closeLocationEdit()}>
            Peruuta
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Tallenna
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickLocationEdit;
