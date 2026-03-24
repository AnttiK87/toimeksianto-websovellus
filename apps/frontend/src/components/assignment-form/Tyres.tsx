import { useEffect } from 'react';

import { tyreTypes, winterTyreTypes, usedTyres } from '../../utils/formOptions.js';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import { resetTyres, resetBalancing, resetUsed, resetUsedState } from './formResetters';

import type { UsedCarForm } from '@shared/dist/index.js';

interface TyresProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const Tyres: React.FC<TyresProps> = ({ formData, handleChange, setFormData }) => {
  useEffect(() => {
    setFormData((prev) => resetTyres(prev));
  }, [formData.tyres.newTyres.newTyres]);

  useEffect(() => {
    setFormData((prev) => resetUsed(prev));
  }, [formData.tyres.newTyres.usedChecked]);

  useEffect(() => {
    setFormData((prev) => resetUsedState(prev));
  }, [formData.tyres.newTyres.usedState]);

  useEffect(() => {
    setFormData((prev) => resetBalancing(prev));
  }, [formData.tyres.balancingNeeded.balancingNeeded]);

  return (
    <>
      {/* Renkaat */}
      <h2 className="form-section-title">Renkaat</h2>
      <TextField
        label="Kesä"
        value={formData.tyres.summer}
        onChange={(v) => handleChange('tyres.summer', v)}
        unit="mm"
        custom="tyres-input-width"
        customLabel="tyres-width"
      />
      <div className="same-row">
        <TextField
          label="Talvi"
          value={formData.tyres.winter}
          onChange={(v) => handleChange('tyres.winter', v)}
          unit="mm"
          custom="tyres-input-width"
          customLabel="tyres-width"
        />
        <SelectField
          label="talvirenkaiden tyyppi"
          options={winterTyreTypes}
          value={formData.tyres.winterType}
          onChange={(v) => handleChange('tyres.winterType', v)}
        />
      </div>
      <div className="same-row">
        <CheckboxField
          label="Renkaat tasapainotettava"
          checked={formData.tyres.balancingNeeded.balancingNeeded}
          onChange={(v) => handleChange('tyres.balancingNeeded.balancingNeeded', v)}
        />
        {formData.tyres.balancingNeeded.balancingNeeded && (
          <SelectField
            label="Tasapainotettavat renkaat"
            options={tyreTypes}
            value={formData.tyres.balancingNeeded.balancingWheels}
            onChange={(v) => handleChange('tyres.balancingNeeded.balancingWheels', v)}
          />
        )}
      </div>
      <CheckboxField
        label="Renkaat uusittava"
        checked={formData.tyres.newTyres.newTyres}
        onChange={(v) => handleChange('tyres.newTyres.newTyres', v)}
      />
      {formData.tyres.newTyres.newTyres && (
        <div>
          <div className="same-row">
            <SelectField
              label="Uusittavat renkaat"
              options={tyreTypes}
              value={formData.tyres.newTyres.tyreType}
              onChange={(v) => handleChange('tyres.newTyres.tyreType', v)}
            />
            <TextField
              label="Rengaskoko"
              value={formData.tyres.newTyres.tyreSize}
              onChange={(v) => handleChange('tyres.newTyres.tyreSize', v)}
            />
          </div>
          <CheckboxField
            label="Tarkastettu käytetyt"
            checked={formData.tyres.newTyres.usedChecked}
            onChange={(v) => handleChange('tyres.newTyres.usedChecked', v)}
          />
          {formData.tyres.newTyres.usedChecked && (
            <div>
              <SelectField
                label="Varastossa"
                options={usedTyres}
                value={formData.tyres.newTyres.usedState}
                onChange={(v) => handleChange('tyres.newTyres.usedState', v)}
                unit="sopivia käytettyjä renkaita"
              />
              {formData.tyres.newTyres.usedState === 2 && (
                <div className="same-row">
                  <TextField
                    label="Varasto"
                    value={formData.tyres.newTyres.storage}
                    onChange={(v) => handleChange('tyres.newTyres.storage', v)}
                    custom="tyres-input-width"
                  />
                  <TextField
                    label="Renkaat"
                    value={formData.tyres.newTyres.usedTyre}
                    onChange={(v) => handleChange('tyres.newTyres.usedTyre', v)}
                    custom="tyres-input-width-2"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Tyres;
