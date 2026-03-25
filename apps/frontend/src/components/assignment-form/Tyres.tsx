import { useEffect } from 'react';

import { tyreTypes, winterTyreTypes, useTyres, ordered } from '../../utils/formOptions.js';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import {
  resetTyres,
  resetTyres2,
  resetDiffer,
  resetOrder,
  resetOrder2,
  resetBalancing,
} from './formResetters';
import { useUpdateEffect } from '../../hooks/useUpdateEffect.js';

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';

interface TyresProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const Tyres: React.FC<TyresProps> = ({ formData, handleChange, setFormData }) => {
  useUpdateEffect(() => {
    if (formData.tyres.newTyres.newTyres === false) setFormData((prev) => resetTyres(prev));
  }, [formData.tyres.newTyres.newTyres]);

  useUpdateEffect(() => {
    if (formData.tyres.newTyres.tyreType != 2) setFormData((prev) => resetTyres2(prev));
  }, [formData.tyres.newTyres.tyreType]);

  useUpdateEffect(() => {
    if (formData.tyres.newTyres.difference === false) setFormData((prev) => resetDiffer(prev));
  }, [formData.tyres.newTyres.difference]);

  useUpdateEffect(() => {
    if (formData.tyres.newTyres.usedState != 1) setFormData((prev) => resetOrder(prev));
  }, [formData.tyres.newTyres.usedState]);

  useUpdateEffect(() => {
    if (formData.tyres.newTyres.usedState2 != 1) setFormData((prev) => resetOrder2(prev));
  }, [formData.tyres.newTyres.usedState2]);

  useUpdateEffect(() => {
    if (formData.tyres.balancingNeeded.balancingNeeded === false)
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
            <CheckboxField
              label="Erikoko renkaat"
              checked={formData.tyres.newTyres.difference}
              onChange={(v) => handleChange('tyres.newTyres.difference', v)}
            />
          </div>
          {formData.tyres.newTyres.tyreType === 2 && <h4>Kesärenkaat:</h4>}
          <div className="same-row">
            <TextField
              label={formData.tyres.newTyres.difference ? 'Rengaskoko etu' : 'Rengaskoko'}
              value={formData.tyres.newTyres.tyreSize1}
              onChange={(v) => handleChange('tyres.newTyres.tyreSize1', v)}
            />
            {formData.tyres.newTyres.difference && (
              <TextField
                label="Rengaskoko taka"
                value={formData.tyres.newTyres.tyreSize2}
                onChange={(v) => handleChange('tyres.newTyres.tyreSize2', v)}
              />
            )}
          </div>
          <div className="same-row">
            <SelectField
              label="Asennettavat renkaat"
              options={useTyres}
              value={formData.tyres.newTyres.usedState}
              onChange={(v) => handleChange('tyres.newTyres.usedState', v)}
            />
            {formData.tyres.newTyres.usedState === 0 && (
              <SelectField
                label="Renkaat on"
                options={ordered}
                value={formData.tyres.newTyres.ordered}
                onChange={(v) => handleChange('tyres.newTyres.ordered', v)}
              />
            )}
          </div>
          <div className="same-row">
            <TextField
              label="Sijainti"
              value={formData.tyres.newTyres.storage}
              onChange={(v) => handleChange('tyres.newTyres.storage', v)}
            />
            <TextField
              label="Merkki ja malli"
              value={formData.tyres.newTyres.usedTyre}
              onChange={(v) => handleChange('tyres.newTyres.usedTyre', v)}
              custom="tyres-input-width-2"
            />
          </div>
          {formData.tyres.newTyres.tyreType === 2 && (
            <>
              <h4>Talvirenkaat:</h4>
              <div className="same-row">
                <TextField
                  label={formData.tyres.newTyres.difference ? 'Rengaskoko etu' : 'Rengaskoko'}
                  value={formData.tyres.newTyres.tyreSize3}
                  onChange={(v) => handleChange('tyres.newTyres.tyreSize3', v)}
                />
                {formData.tyres.newTyres.difference && (
                  <TextField
                    label="Rengaskoko taka"
                    value={formData.tyres.newTyres.tyreSize4}
                    onChange={(v) => handleChange('tyres.newTyres.tyreSize4', v)}
                  />
                )}
              </div>
              <div className="same-row">
                <SelectField
                  label="Asennettavat renkaat"
                  options={useTyres}
                  value={formData.tyres.newTyres.usedState2}
                  onChange={(v) => handleChange('tyres.newTyres.usedState2', v)}
                />
                {formData.tyres.newTyres.usedState2 === 0 && (
                  <SelectField
                    label="Renkaat on"
                    options={ordered}
                    value={formData.tyres.newTyres.ordered2}
                    onChange={(v) => handleChange('tyres.newTyres.ordered2', v)}
                  />
                )}
              </div>
              <div className="same-row">
                <TextField
                  label="Sijainti"
                  value={formData.tyres.newTyres.storage2}
                  onChange={(v) => handleChange('tyres.newTyres.storage2', v)}
                />
                <TextField
                  label="Merkki ja malli"
                  value={formData.tyres.newTyres.usedTyre2}
                  onChange={(v) => handleChange('tyres.newTyres.usedTyre2', v)}
                  custom="tyres-input-width-2"
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Tyres;
