import { useEffect } from 'react';

import { salesMen, locations } from '../../utils/formOptions.js';

import DateField from '../uiComponents/DateField.js';
import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import type { UsedCarForm } from '@shared/dist/index.js';

interface BasinInfoProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
}

const BasinInfo: React.FC<BasinInfoProps> = ({ formData, handleChange }) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <>
      <div className="same-row">
        <DateField
          label="Toimeksiannon päiväys"
          value={formData.date}
          onChange={(v) => handleChange('date', v)}
        />
        <TextField
          label="Toimeksiannon tekijä"
          value={formData.assigneer}
          onChange={(v) => handleChange('assigneer', v)}
          custom="tyres-input-width-2"
        />
      </div>
      <div className="same-row">
        <SelectField
          label="Myyjä"
          options={salesMen}
          value={formData.salesMan}
          onChange={(v) => handleChange('salesMan', v)}
        />
        <SelectField
          label="Ajoneuvon sijainti"
          options={locations}
          value={formData.location}
          onChange={(v) => handleChange('location', v)}
        />
      </div>
      {/* Perustiedot */}
      <h2 className="form-section-title">Ajoneuvon perustiedot:</h2>

      <TextField
        label="Merkki ja malli"
        value={formData.car.makeAndModel}
        onChange={(v) => handleChange('car.makeAndModel', v)}
        custom="long-input"
        required
      />
      <div className="same-row">
        <TextField
          label="Rek.nro"
          required
          value={formData.regNum}
          onChange={(v) => handleChange('regNum', v)}
        />
        <TextField
          label="Alustanro"
          required
          custom="tyres-input-width-2"
          value={formData.vin}
          onChange={(v) => handleChange('vin', v)}
        />
      </div>
      <div className="same-row">
        <TextField
          label="Ajomäärä"
          value={formData.car.mileage}
          onChange={(v) => handleChange('car.mileage', v)}
          unit="km"
        />

        <DateField
          label="Rek.pvm"
          value={formData.car.regDate}
          max={today}
          onChange={(v) => handleChange('car.regDate', v)}
        />
      </div>
      {/* Takuu */}
      <h4>Takuu:</h4>
      <div className="same-row no-gap">
        <CheckboxField
          label="Tehdastakuu voimassa"
          checked={formData.warranty.enabled}
          onChange={(v) => handleChange('warranty.enabled', v)}
        />
        {formData.warranty.enabled && (
          <DateField
            label="asti"
            value={formData.warranty.until}
            min={today}
            onChange={(v) => handleChange('warranty.until', v)}
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
          onChange={(v) => handleChange('inspection.date', v)}
        />
        <CheckboxField
          label="Katsastettava"
          checked={formData.inspection.needed}
          onChange={(v) => handleChange('inspection.needed', v)}
        />
      </div>
    </>
  );
};

export default BasinInfo;
