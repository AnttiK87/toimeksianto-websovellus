import { useState, useEffect } from 'react';

import { yesOrNo } from '../../utils/formOptions.js';
import Button from '../uiComponents/Button.js';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';
import OtherRepairsList from './OtherRepairsList.js';

import { resetHeater, resetAc, resetBulbChange } from './formResetters';
import { useUpdateEffect } from '../../hooks/useUpdateEffect.js';

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';

interface OtherServiceProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const OtherService: React.FC<OtherServiceProps> = ({ formData, handleChange, setFormData }) => {
  const [otherJob, setOtherJob] = useState<string>('');

  const addRepair = () => {
    if (otherJob === '') return;

    const newRepair = {
      id: crypto.randomUUID(),
      otherRepair: otherJob,
      repair: null,
    };

    // Patch: lisätään uusi elementti arrayhin
    handleChange(`otherServiceWork.otherRepairs`, [
      ...(formData.otherServiceWork.otherRepairs || []),
      newRepair,
    ]);

    setOtherJob('');
  };

  const removeRepair = (index: number) => {
    console.log('Removing repair at index:', index);

    const updatedRepairs = formData.otherServiceWork.otherRepairs.filter((_, i) => i !== index);

    handleChange(`otherServiceWork.otherRepairs`, updatedRepairs);
  };

  useUpdateEffect(() => {
    if (formData.otherServiceWork.heater.heater != 1) setFormData((prev) => resetHeater(prev));
  }, [formData.otherServiceWork.heater.heater]);

  useUpdateEffect(() => {
    if (formData.otherServiceWork.ac.ac != 1) setFormData((prev) => resetAc(prev));
  }, [formData.otherServiceWork.ac.ac]);

  useUpdateEffect(() => {
    if (formData.otherServiceWork.bulbChange.bulbChange === false)
      setFormData((prev) => resetBulbChange(prev));
  }, [formData.otherServiceWork.bulbChange.bulbChange]);

  return (
    <>
      {/* Muut huoltotoimenpiteet */}
      <h2 className="form-section-title">Muut korjaamossa tehtävät huolto- ja korjaustyöt</h2>
      <SelectField
        label="Toimiiko lisälämmitin"
        options={yesOrNo}
        value={formData.otherServiceWork.heater.heater}
        onChange={(v) => handleChange('otherServiceWork.heater.heater', v)}
      />
      {formData.otherServiceWork.heater.heater === 1 && (
        <div className="bottom-divider">
          <CheckboxField
            label="Korjataan"
            checked={formData.otherServiceWork.heater.heaterRepair}
            onChange={(v) => handleChange('otherServiceWork.heater.heaterRepair', v)}
          />
        </div>
      )}
      <SelectField
        label="Toimiiko ilmastointi"
        options={yesOrNo}
        value={formData.otherServiceWork.ac.ac}
        onChange={(v) => handleChange('otherServiceWork.ac.ac', v)}
      />
      {formData.otherServiceWork.ac.ac === 1 && (
        <div className="bottom-divider">
          <CheckboxField
            label="Korjataan"
            checked={formData.otherServiceWork.ac.acRepair}
            onChange={(v) => handleChange('otherServiceWork.ac.acRepair', v)}
          />
          <SelectField
            label="Ilmastointihuolto on jo tehty"
            options={yesOrNo}
            value={formData.otherServiceWork.ac.acService}
            onChange={(v) => handleChange('otherServiceWork.ac.acService', v)}
          />
        </div>
      )}
      <CheckboxField
        label="Korjaamossa vaihdettavia polttimoita"
        checked={formData.otherServiceWork.bulbChange.bulbChange}
        onChange={(v) => handleChange('otherServiceWork.bulbChange.bulbChange', v)}
      />
      {formData.otherServiceWork.bulbChange.bulbChange && (
        <TextField
          label="Mikä/mitkä"
          value={formData.otherServiceWork.bulbChange.bulbs}
          onChange={(v) => handleChange('otherServiceWork.bulbChange.bulbs', v)}
        />
      )}
      <CheckboxField
        label="Pyöränkulmien tarkastus ja säätö tehtävä"
        checked={formData.otherServiceWork.wheelAlignment.wheelAlignment}
        onChange={(v) => handleChange('otherServiceWork.wheelAlignment.wheelAlignment', v)}
      />
      <TextField
        label="Muuta korjattavaa"
        value={otherJob}
        onChange={(v) => setOtherJob(v)}
        enterFunction={addRepair}
        custom="long-input"
      />
      <Button variant="secondary" type="button" onClick={addRepair}>
        Lisää työ toimeksiantoon
      </Button>
      <OtherRepairsList repairs={formData.otherServiceWork.otherRepairs} onRemove={removeRepair} />
    </>
  );
};

export default OtherService;
