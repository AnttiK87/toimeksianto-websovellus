import { useEffect } from 'react';

import { ecarOpt, emissionStandard } from '../../utils/formOptions.js';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';

import { resetElectric } from './formResetters.js';

import type { UsedCarForm } from '@shared/dist/index.js';

interface ElectricCarProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const ElectricCar: React.FC<ElectricCarProps> = ({ formData, handleChange, setFormData }) => {
  useEffect(() => {
    if (formData.electric.type !== 1 && formData.electric.type !== 2) {
      setFormData((prev) => resetElectric(prev));
    }
  }, [formData.electric.type]);

  return (
    <>
      {/* Sähköauto */}
      <h2 className="form-section-title">Sähkökäyttöinen auto</h2>
      <SelectField
        label="Tyyppi"
        options={ecarOpt}
        value={formData.electric.type}
        onChange={(v) => handleChange('electric.type', v)}
      />
      {(formData.electric.type === 1 || formData.electric.type === 2) && (
        <div>
          <TextField
            label="Latauskaapeli(t)"
            value={formData.electric.chargeCable}
            onChange={(v) => handleChange('electric.chargeCable', v)}
            custom="long-input"
          />
          <TextField
            label="Sisäisen AC laturin teho"
            value={formData.electric.acPower}
            onChange={(v) => handleChange('electric.acPower', v)}
            unit="kWh"
            customLabel="min-width"
          />
          <TextField
            label="DC pikalatausteho"
            value={formData.electric.dcPower}
            onChange={(v) => handleChange('electric.dcPower', v)}
            unit="kWh"
            customLabel="min-width"
          />
          <TextField
            label="Toimintamatka sähköllä"
            value={formData.electric.range}
            onChange={(v) => handleChange('electric.range', v)}
            unit="km"
            customLabel="min-width"
          />
          <h4>Akkukapasiteetti:</h4>
          <SelectField
            label="Mittaustapa"
            options={emissionStandard}
            value={formData.electric.standard}
            onChange={(v) => handleChange('electric.standard', v)}
          />
          <TextField
            label="Brutto"
            value={formData.electric.capacityGross}
            onChange={(v) => handleChange('electric.capacityGross', v)}
            unit="kWh"
            customLabel="electric-width"
          />
          <TextField
            label="Netto"
            value={formData.electric.capacityNet}
            onChange={(v) => handleChange('electric.capacityNet', v)}
            unit="kWh"
            customLabel="electric-width"
          />
        </div>
      )}
    </>
  );
};

export default ElectricCar;
