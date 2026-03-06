import { tyreTypes, winterTyreTypes, usedTyres } from '../../utils/formOptions.js';

import SelectField from './SelectField';
import TextField from './TextField';
import CheckboxField from './CheckboxField';

import type { UsedCarForm } from '@shared/index.js';

interface TyresProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const Tyres: React.FC<TyresProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Renkaat */}
      <h2 className="form-section-title">Renkaat</h2>
      <TextField
        label="Kesä"
        value={formData.tyres.summer}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            tyres: { ...prev.tyres, summer: v },
          }))
        }
        unit="mm"
        custom="tyres-input-width"
        customLabel="tyres-width"
      />
      <div className="same-row">
        <TextField
          label="Talvi"
          value={formData.tyres.winter}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              tyres: { ...prev.tyres, winter: v },
            }))
          }
          unit="mm"
          custom="tyres-input-width"
          customLabel="tyres-width"
        />
        <SelectField
          label="talvirenkaiden tyyppi"
          options={winterTyreTypes}
          value={formData.tyres.winterType}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              tyres: { ...prev.tyres, winterType: v },
            }))
          }
        />
      </div>
      <div className="same-row">
        <CheckboxField
          label="Renkaat tasapainotettava"
          checked={formData.tyres.balancingNeeded}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              tyres: { ...prev.tyres, balancingNeeded: v },
            }))
          }
        />
        {formData.tyres.balancingNeeded && (
          <SelectField
            label="Tasapainotettavat renkaat"
            options={tyreTypes}
            value={formData.tyres.balancingWheels}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                tyres: { ...prev.tyres, balancingWheels: v },
              }))
            }
          />
        )}
      </div>
      <CheckboxField
        label="Renkaat uusittava"
        checked={formData.tyres.newTyres}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            tyres: { ...prev.tyres, newTyres: v },
          }))
        }
      />
      {formData.tyres.newTyres && (
        <div>
          <div className="same-row">
            <SelectField
              label="Uusittavat renkaat"
              options={tyreTypes}
              value={formData.tyres.tyreType}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  tyres: { ...prev.tyres, tyreType: v },
                }))
              }
            />
            <TextField
              label="Rengaskoko"
              value={formData.tyres.tyreSize}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  tyres: { ...prev.tyres, tyreSize: v },
                }))
              }
            />
          </div>
          <CheckboxField
            label="Tarkastettu käytetyt"
            checked={formData.tyres.usedChecked}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                tyres: { ...prev.tyres, usedChecked: v },
              }))
            }
          />
          {formData.tyres.usedChecked && (
            <div>
              <SelectField
                label="Varastossa"
                options={usedTyres}
                value={formData.tyres.usedState}
                onChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    tyres: { ...prev.tyres, usedState: v },
                  }))
                }
                unit="sopivia käytettyjä renkaita"
              />
              {formData.tyres.usedState === 2 && (
                <div className="same-row">
                  <TextField
                    label="Varasto"
                    value={formData.tyres.storage}
                    onChange={(v) =>
                      setFormData((prev) => ({
                        ...prev,
                        tyres: { ...prev.tyres, storage: v },
                      }))
                    }
                    custom="tyres-input-width"
                  />
                  <TextField
                    label="Renkaat"
                    value={formData.tyres.usedTyre}
                    onChange={(v) =>
                      setFormData((prev) => ({
                        ...prev,
                        tyres: { ...prev.tyres, usedTyre: v },
                      }))
                    }
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
