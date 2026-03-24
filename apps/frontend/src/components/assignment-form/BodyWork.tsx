import { useEffect } from 'react';

import {
  windshWorkshops,
  insuranceCompanies,
  payers,
  repairTypes,
  painters,
} from '../../utils/formOptions.js';

import DateField from '../uiComponents/DateField.js';
import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import {
  resetWindshield,
  resetSubcontractor,
  resetInsurance,
  resetOtherInsurance,
  resetDamage,
  resetDamageInsurance,
  resetDamageOtherInsurance,
  resetBodyWarranty,
  resetBodyWarrantyPainter,
} from './formResetters';

import type { UsedCarForm } from '@shared/dist/index.js';

interface BodyWorkProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const BodyWork: React.FC<BodyWorkProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setFormData((prev) => resetWindshield(prev));
  }, [formData.windshield.change]);

  useEffect(() => {
    setFormData((prev) => resetSubcontractor(prev));
  }, [formData.windshield.workshop]);

  useEffect(() => {
    setFormData((prev) => resetInsurance(prev));
  }, [formData.windshield.insurance]);

  useEffect(() => {
    setFormData((prev) => resetOtherInsurance(prev));
  }, [formData.windshield.insuranceCompany]);

  useEffect(() => {
    setFormData((prev) => resetDamage(prev));
  }, [formData.damage.damaged]);

  useEffect(() => {
    setFormData((prev) => resetDamageInsurance(prev));
  }, [formData.damage.repairType]);

  useEffect(() => {
    setFormData((prev) => resetDamageOtherInsurance(prev));
  }, [formData.damage.insuranceCompany]);

  useEffect(() => {
    setFormData((prev) => resetBodyWarranty(prev));
  }, [formData.bodyWarranty.enabled]);

  useEffect(() => {
    setFormData((prev) => resetBodyWarrantyPainter(prev));
  }, [formData.bodyWarranty.repairIsMade]);

  return (
    <>
      {/* Korikorjaamon toimenpiteet */}
      <h2 className="form-section-title">Korikorjaamon toimenpiteet</h2>
      <h4>Tuulilasi:</h4>
      <CheckboxField
        label="Tuulilasi vaihdettava"
        checked={formData.windshield.change}
        onChange={(v) => handleChange('windshield.change', v)}
      />
      {formData.windshield.change && (
        <div className="bottom-divider">
          <SelectField
            label="Vaihdetaan"
            options={windshWorkshops}
            value={formData.windshield.workshop}
            onChange={(v) => handleChange('windshield.workshop', v)}
          />
          {formData.windshield.workshop === 2 && (
            <TextField
              label="Missä"
              value={formData.windshield.subcontractor}
              onChange={(v) => handleChange('windshield.subcontractor', v)}
            />
          )}
          <CheckboxField
            label="Lasivakuutus"
            checked={formData.windshield.insurance}
            onChange={(v) => handleChange('windshield.insurance', v)}
          />
          {formData.windshield.insurance && (
            <div>
              <SelectField
                label="Vakuutusyhtiö"
                options={insuranceCompanies}
                value={formData.windshield.insuranceCompany}
                onChange={(v) => handleChange('windshield.insuranceCompany', v)}
              />
              {formData.windshield.insuranceCompany === 8 && (
                <TextField
                  label="Mikä"
                  value={formData.windshield.otherInsuranceCompany}
                  onChange={(v) => handleChange('windshield.otherInsuranceCompany', v)}
                />
              )}
              <DateField
                label="Vahinkopäivä"
                value={formData.windshield.damageDate}
                max={today}
                onChange={(v) => handleChange('windshield.damageDate', v)}
              />
              <TextField
                label="Omavastuu"
                value={formData.windshield.changeFee}
                onChange={(v) => handleChange('windshield.changeFee', v)}
                unit="€"
              />
              <SelectField
                label="Omavastuun maksaja"
                options={payers}
                value={formData.windshield.feePayer}
                onChange={(v) => handleChange('windshield.feePayer', v)}
              />
            </div>
          )}
        </div>
      )}
      {/* Vaurio ja korikorjaus */}
      <h4>Maalattavaa ja/tai vaurioikorjausta:</h4>
      <CheckboxField
        label="Autossa maalattavaa tai vaurioikorjaus"
        checked={formData.damage.damaged}
        onChange={(v) => handleChange('damage.damaged', v)}
      />
      {formData.damage.damaged && (
        <div className="bottom-divider">
          <SelectField
            label="Korjataan"
            options={repairTypes}
            value={formData.damage.repairType}
            onChange={(v) => handleChange('damage.repairType', v)}
            unit="työnä"
          />
          {formData.damage.repairType === 1 && (
            <div>
              <SelectField
                label="Vakuutusyhtiö"
                options={insuranceCompanies}
                value={formData.damage.insuranceCompany}
                onChange={(v) => handleChange('damage.insuranceCompany', v)}
              />
              {formData.damage.insuranceCompany === 8 && (
                <TextField
                  label="Mikä"
                  value={formData.damage.otherInsuranceCompany}
                  onChange={(v) => handleChange('damage.otherInsuranceCompany', v)}
                />
              )}
              <DateField
                label="Vahinkopäivä"
                value={formData.damage.damageDate}
                max={today}
                onChange={(v) => handleChange('damage.damageDate', v)}
              />
              <TextField
                label="Omavastuu"
                value={formData.damage.repairFee}
                onChange={(v) => handleChange('damage.repairFee', v)}
                unit="€"
              />
              <TextField
                label="Vahinkotunnus"
                value={formData.damage.damageId}
                onChange={(v) => handleChange('damage.damageId', v)}
              />
              <SelectField
                label="Omavastuun maksaja"
                options={payers}
                value={formData.damage.feePayer}
                onChange={(v) => handleChange('damage.feePayer', v)}
              />
            </div>
          )}
          {formData.damage.repairType === 2 && (
            <div>
              <SelectField
                label="Maalaamo"
                options={painters}
                value={formData.damage.painter}
                onChange={(v) => handleChange('damage.painter', v)}
              />
              <CheckboxField
                label="Osia purettava omassa korjaamossa"
                checked={formData.damage.disassembly}
                onChange={(v) => handleChange('damage.disassembly', v)}
              />
            </div>
          )}
        </div>
      )}
      {/* Koritakuu */}
      <h4>Koritakuu</h4>
      <CheckboxField
        label="Koritakuu kyselytehtävä"
        checked={formData.bodyWarranty.enabled}
        onChange={(v) => handleChange('bodyWarranty.enabled', v)}
      />
      {formData.bodyWarranty.enabled && (
        <div>
          <CheckboxField
            label="Korjataan joka tapauksessa"
            checked={formData.bodyWarranty.repairIsMade}
            onChange={(v) => handleChange('bodyWarranty.repairIsMade', v)}
          />
          {formData.bodyWarranty.repairIsMade && (
            <SelectField
              label="Maalaamo"
              options={painters}
              value={formData.bodyWarranty.painter}
              onChange={(v) => handleChange('bodyWarranty.painter', v)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BodyWork;
