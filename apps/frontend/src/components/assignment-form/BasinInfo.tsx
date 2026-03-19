import { useEffect } from 'react';

import { salesMen, locations } from '../../utils/formOptions.js';

import DateField from '../uiComponents/DateField.js';
import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import type { UsedCarForm } from '@shared/index.js';

interface BasinInfoProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const BasinInfo: React.FC<BasinInfoProps> = ({ formData, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!formData.sold && formData.location === 7) {
      setFormData((prev) => ({
        ...prev,
        location: null,
      }));
    }
  }, [formData.sold]);

  return (
    <>
      <div className="same-row">
        <DateField
          label="Toimeksiannon päiväys"
          value={formData.date}
          onChange={(v) => setFormData((prev) => ({ ...prev, date: v }))}
        />
        <TextField
          label="Toimeksiannon tekijä"
          value={formData.assigneer}
          onChange={(v) => setFormData((prev) => ({ ...prev, assigneer: v }))}
          custom="tyres-input-width-2"
        />
      </div>
      <div className="same-row">
        <SelectField
          label="Myyjä"
          options={salesMen}
          value={formData.salesMan}
          onChange={(v) => setFormData((prev) => ({ ...prev, salesMan: v }))}
        />
        <SelectField
          label="Ajoneuvon sijainti"
          options={locations}
          value={formData.location}
          onChange={(v) => setFormData((prev) => ({ ...prev, location: v }))}
        />
      </div>
      {/* Perustiedot */}
      <h2 className="form-section-title">Ajoneuvon perustiedot:</h2>

      <TextField
        label="Merkki ja malli"
        value={formData.car.makeAndModel}
        onChange={(v) =>
          setFormData((prev) => ({ ...prev, car: { ...prev.car, makeAndModel: v } }))
        }
        custom="long-input"
        required
      />
      <div className="same-row">
        <TextField
          label="Rek.nro"
          required
          value={formData.car.regNum}
          onChange={(v) => setFormData((prev) => ({ ...prev, car: { ...prev.car, regNum: v } }))}
        />
        <TextField
          label="Alustanro"
          required
          custom="tyres-input-width-2"
          value={formData.car.vin}
          onChange={(v) => setFormData((prev) => ({ ...prev, car: { ...prev.car, vin: v } }))}
        />
      </div>
      <div className="same-row">
        <TextField
          label="Ajomäärä"
          value={formData.car.mileage}
          onChange={(v) => setFormData((prev) => ({ ...prev, car: { ...prev.car, mileage: v } }))}
          unit="km"
        />

        <DateField
          label="Rek.pvm"
          value={formData.car.regDate}
          max={today}
          onChange={(v) => setFormData((prev) => ({ ...prev, car: { ...prev.car, regDate: v } }))}
        />
      </div>
      {/* Takuu */}
      <h4>Takuu:</h4>
      <div className="same-row no-gap">
        <CheckboxField
          label="Tehdastakuu voimassa"
          checked={formData.warranty.enabled}
          onChange={(v) =>
            setFormData((prev) => ({ ...prev, warranty: { ...prev.warranty, enabled: v } }))
          }
        />
        {formData.warranty.enabled && (
          <DateField
            label="asti"
            value={formData.warranty.until}
            min={today}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, warranty: { ...prev.warranty, until: v } }))
            }
          />
        )}
      </div>
      {/* Katsastus */}
      <h4>Katsastus:</h4>
      <div className="same-row">
        <DateField
          label="Seuraava katsastus"
          value={formData.inspection.date}
          min={today}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              inspection: { ...prev.inspection, date: v },
            }))
          }
        />
        <CheckboxField
          label="Katsastettava"
          checked={formData.inspection.needed}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              inspection: { ...prev.inspection, needed: v },
            }))
          }
        />
      </div>
    </>
  );
};

export default BasinInfo;
