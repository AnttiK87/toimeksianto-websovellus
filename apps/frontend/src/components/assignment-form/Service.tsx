import { useEffect } from 'react';

import { serviceTypes, serviceOptions, engineTimingTypes } from '../../utils/formOptions.js';

import DateField from '../uiComponents/DateField.js';
import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import { resetService, resetServiceSelected, resetTiming } from './formResetters';
import { useUpdateEffect } from '../../hooks/useUpdateEffect.js';

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';

interface ServiceProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const Service: React.FC<ServiceProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  useUpdateEffect(() => {
    if (formData.service.needed === false) setFormData((prev) => resetService(prev));
  }, [formData.service.needed]);

  useUpdateEffect(() => {
    if (formData.service.type != 1) setFormData((prev) => resetServiceSelected(prev));
  }, [formData.service.type]);

  useUpdateEffect(() => {
    setFormData((prev) => resetServiceSelected(prev));
  }, [formData.timing.type]);

  return (
    <>
      {/* Huoltotoimenpiteet */}
      <h2 className="form-section-title">Huolto</h2>
      <div className="same-row no-gap">
        <TextField
          label="Edellinen huolto suoritettu"
          value={formData.serviceHistory.lastService}
          onChange={(v) => handleChange('serviceHistory.lastService', v)}
          unit="tkm"
          custom="tyres-input-width"
        />
        <DateField
          label="ja pvm"
          max={today}
          value={formData.serviceHistory.lastServiceDate}
          onChange={(v) => handleChange('serviceHistory.lastServiceDate', v)}
        />
      </div>
      <div className="same-row no-gap">
        <TextField
          label="Seuraava huolto"
          value={formData.serviceHistory.nextService}
          onChange={(v) => handleChange('serviceHistory.nextService', v)}
          unit="tkm"
          custom="tyres-input-width"
        />
        <DateField
          label="tai"
          value={formData.serviceHistory.nextServiceDate}
          min={today}
          onChange={(v) => handleChange('serviceHistory.nextServiceDate', v)}
        />
      </div>
      <CheckboxField
        label="Autolle tehtävä huolto"
        checked={formData.service.needed}
        onChange={(v) => handleChange('service.needed', v)}
      />
      {formData.service.needed && (
        <div>
          <SelectField
            label="Huolto suoritetaan"
            options={serviceTypes}
            value={formData.service.type}
            onChange={(v) => handleChange('service.type', v)}
            unit="mukaisesti."
          />
          {formData.service.type === 1 && (
            <div className="service-options">
              {serviceOptions.map((service) => (
                <CheckboxField
                  key={service}
                  label={service}
                  checked={formData.service.selected.includes(service)}
                  onChange={(v) => handleChange('service.selected.includes(service)', v)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Jakopää */}
      <SelectField
        label="Jakopää"
        options={engineTimingTypes}
        value={formData.timing.type}
        onChange={(v) => handleChange('timing.type', v)}
      />
      {formData.timing.type === 0 && (
        <div>
          <div className="same-row no-gap">
            <TextField
              label="Vaihtoväli"
              value={formData.timing.beltChangeKm}
              onChange={(v) => handleChange('timing.beltChangeKm', v)}
              unit="tkm"
              custom="tyres-input-width"
            />
            <TextField
              label="tai"
              value={formData.timing.beltChangeTime}
              onChange={(v) => handleChange('timing.beltChangeTime', v)}
              unit="vuotta"
              custom="tyres-input-width"
            />
          </div>
          <div className="same-row no-gap">
            <TextField
              label="Vaihdettu"
              value={formData.timing.lastBeltChangeKm}
              onChange={(v) => handleChange('timing.lastBeltChangeKm', v)}
              unit="tkm"
              custom="tyres-input-width"
            />
            <DateField
              label="ja pvm"
              value={formData.timing.lastBeltChangeTime}
              onChange={(v) => handleChange('timing.lastBeltChangeTime', v)}
            />
          </div>
          <CheckboxField
            label="Jakohinhan vaihto"
            checked={formData.timing.beltChangeNeeded}
            onChange={(v) => handleChange('timing.beltChangeNeeded', v)}
          />
        </div>
      )}
      {formData.timing.type === 1 && (
        <CheckboxField
          label="Jakoketjun vaihto"
          checked={formData.timing.chainChangeNeeded}
          onChange={(v) => handleChange('timing.chainChangeNeeded', v)}
        />
      )}
    </>
  );
};

export default Service;
