import { ecarOpt, emissionStandard } from '../../utils/formOptions.js';

import SelectField from './SelectField';
import TextField from './TextField';

import type { UsedCarForm } from '@shared/index.js';

interface ElectricCarProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const ElectricCar: React.FC<ElectricCarProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Sähköauto */}
      <h2 className="form-section-title">Sähkökäyttöinen auto</h2>
      <SelectField
        label="Tyyppi"
        options={ecarOpt}
        value={formData.electric.type}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            electric: { ...prev.electric, type: v },
          }))
        }
      />
      {(formData.electric.type === 1 || formData.electric.type === 2) && (
        <div>
          <TextField
            label="Latauskaapeli(t)"
            value={formData.electric.chargeCable}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, chargeCable: v },
              }))
            }
            custom="long-input"
          />
          <TextField
            label="Sisäisen AC laturin teho"
            value={formData.electric.acPower}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, acPower: v },
              }))
            }
            unit="kWh"
            customLabel="min-width"
          />
          <TextField
            label="DC pikalatausteho"
            value={formData.electric.dcPower}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, dcPower: v },
              }))
            }
            unit="kWh"
            customLabel="min-width"
          />
          <TextField
            label="Toimintamatka sähköllä"
            value={formData.electric.range}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, range: v },
              }))
            }
            unit="km"
            customLabel="min-width"
          />
          <h4>Akkukapasiteetti:</h4>
          <SelectField
            label="Mittaustapa"
            options={emissionStandard}
            value={formData.electric.standard}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, standard: v },
              }))
            }
          />
          <TextField
            label="Brutto"
            value={formData.electric.capacityGross}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, capacityGross: v },
              }))
            }
            unit="kWh"
            customLabel="electric-width"
          />
          <TextField
            label="Netto"
            value={formData.electric.capacityNet}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                electric: { ...prev.electric, capacityNet: v },
              }))
            }
            unit="kWh"
            customLabel="electric-width"
          />
        </div>
      )}
    </>
  );
};

export default ElectricCar;
