import {
  windshWorkshops,
  insuranceCompanies,
  payers,
  repairTypes,
  painters,
} from '../../utils/formOptions.js';

import DateField from './DateField';
import SelectField from './SelectField';
import TextField from './TextField';
import CheckboxField from './CheckboxField';
import TextAreaField from './TextAreaField';

import type { UsedCarForm } from '@shared/index.js';

interface BodyWorkProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const BodyWork: React.FC<BodyWorkProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Korikorjaamon toimenpiteet */}
      <h2 className="form-section-title">Korikorjaamon toimenpiteet</h2>
      <h4>Tuulilasi:</h4>
      <CheckboxField
        label="Tuulilasi vaihdettava"
        checked={formData.windshield.change}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            windshield: { ...prev.windshield, change: v },
          }))
        }
      />
      {formData.windshield.change && (
        <div>
          <SelectField
            label="Vaihdetaan"
            options={windshWorkshops}
            value={formData.windshield.workshop}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                windshield: { ...prev.windshield, workshop: v },
              }))
            }
          />
          {formData.windshield.workshop === 2 && (
            <TextField
              label="Missä"
              value={formData.windshield.subcontractor}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  windshield: { ...prev.windshield, subcontractor: v },
                }))
              }
            />
          )}
          <CheckboxField
            label="Lasivakuutus"
            checked={formData.windshield.insurance}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                windshield: { ...prev.windshield, insurance: v },
              }))
            }
          />
          {formData.windshield.insurance && (
            <div>
              <SelectField
                label="Vakuutusyhtiö"
                options={insuranceCompanies}
                value={formData.windshield.insuranceCompany}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, insuranceCompany: v },
                  }))
                }
              />
              {formData.windshield.insuranceCompany === 8 && (
                <TextField
                  label="Mikä"
                  value={formData.windshield.otherInsuranceCompany}
                  onChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      windshield: { ...prev.windshield, otherInsuranceCompany: v },
                    }))
                  }
                />
              )}
              <DateField
                label="Vahinkopäivä"
                value={formData.windshield.damageDate}
                max={today}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, damageDate: v },
                  }))
                }
              />
              <TextField
                label="Omavastuu"
                value={formData.windshield.changeFee}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, changeFee: v },
                  }))
                }
                unit="€"
              />
              <SelectField
                label="Omavastuun maksaja"
                options={payers}
                value={formData.windshield.feePayer}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, feePayer: v },
                  }))
                }
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
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            damage: { ...prev.damage, damaged: v },
          }))
        }
      />
      {formData.damage.damaged && (
        <div>
          <SelectField
            label="Korjataan"
            options={repairTypes}
            value={formData.damage.repairType}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                damage: { ...prev.damage, repairType: v },
              }))
            }
            unit="työnä"
          />
          {formData.damage.repairType && (
            <TextAreaField
              label="Vaurion kuvaus"
              value={formData.damage.description}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  damage: { ...prev.damage, description: v },
                }))
              }
              rows={4}
            />
          )}
          {formData.damage.repairType === 1 && (
            <div>
              <SelectField
                label="Vakuutusyhtiö"
                options={insuranceCompanies}
                value={formData.damage.insuranceCompany}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    damage: { ...prev.damage, insuranceCompany: v },
                  }))
                }
              />
              {formData.damage.insuranceCompany === 8 && (
                <TextField
                  label="Mikä"
                  value={formData.windshield.otherInsuranceCompany}
                  onChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      windshield: { ...prev.windshield, otherInsuranceCompany: v },
                    }))
                  }
                />
              )}
              <DateField
                label="Vahinkopäivä"
                value={formData.windshield.damageDate}
                max={today}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, damageDate: v },
                  }))
                }
              />
              <TextField
                label="Omavastuu"
                value={formData.windshield.changeFee}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, changeFee: v },
                  }))
                }
                unit="€"
              />
              <SelectField
                label="Omavastuun maksaja"
                options={payers}
                value={formData.windshield.feePayer}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    windshield: { ...prev.windshield, feePayer: v },
                  }))
                }
              />
            </div>
          )}
          {formData.damage.repairType === 2 && (
            <div>
              <SelectField
                label="Maalaamo"
                options={painters}
                value={formData.damage.painter}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    damage: { ...prev.damage, painter: v },
                  }))
                }
              />
              <CheckboxField
                label="Osia purettava omassa korjaamossa"
                checked={formData.damage.disassembly}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    damage: { ...prev.damage, disassembly: v },
                  }))
                }
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
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            bodyWarranty: { ...prev.bodyWarranty, enabled: v },
          }))
        }
      />
      {formData.bodyWarranty.enabled && (
        <div>
          <TextAreaField
            label="Vaurion kuvaus"
            value={formData.bodyWarranty.description}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                bodyWarranty: { ...prev.bodyWarranty, description: v },
              }))
            }
            rows={4}
          />
          <CheckboxField
            label="Korjataan joka tapauksessa"
            checked={formData.bodyWarranty.repairIsMade}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                bodyWarranty: { ...prev.bodyWarranty, repairIsMade: v },
              }))
            }
          />
          {formData.bodyWarranty.repairIsMade && (
            <SelectField
              label="Maalaamo"
              options={painters}
              value={formData.damage.painter} // Huom! Tämä kenttä voidaan halutessa siirtää bodyWarranty-objektiin
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  damage: { ...prev.damage, painter: v },
                }))
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default BodyWork;
