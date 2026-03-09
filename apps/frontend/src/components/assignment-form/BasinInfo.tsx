import { salesMen } from '../../utils/formOptions.js';

import DateField from '../uiComponents/DateField.js';
import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import type { UsedCarForm } from '@shared/index.js';

interface BasinInfoProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const BasinInfo: React.FC<BasinInfoProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Päiväys ja myyjä */}
      <div className="same-row">
        <DateField
          label="Toimeksiannon päiväys"
          value={formData.date}
          onChange={(v) => handleChange('date', v)}
        />
        <SelectField
          label="Myyjä"
          options={salesMen}
          value={formData.salesMan}
          onChange={(v) => handleChange('salesMan', v)}
        />
        <TextField
          label="Toimeksiannon tekijä"
          value={formData.assigneer}
          onChange={(v) => handleChange('assigneer', v)}
          custom="tyres-input-width-2"
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
      />
      <div className="same-row">
        <TextField
          label="Rek.nro"
          value={formData.car.regNum}
          onChange={(v) => setFormData((prev) => ({ ...prev, car: { ...prev.car, regNum: v } }))}
        />
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
