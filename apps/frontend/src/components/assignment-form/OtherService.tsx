import { yesOrNo } from '../../utils/formOptions.js';

import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import TextField from './TextField';
import CheckboxField from './CheckboxField';

import type { UsedCarForm } from '@shared/index.js';

interface OtherServiceProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const OtherService: React.FC<OtherServiceProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Muut huoltotoimenpiteet */}
      <h2 className="form-section-title">Muut huoltotyöt korjaamossa</h2>
      <SelectField
        label="Toimiiko lisälämmitin"
        options={yesOrNo}
        value={formData.workshop.heater}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            workshop: { ...prev.workshop, heater: v },
          }))
        }
      />
      {formData.workshop.heater === 2 && (
        <SelectField
          label="Korjataanko"
          options={yesOrNo}
          value={formData.workshop.heaterRepair}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              workshop: { ...prev.workshop, heaterRepair: v },
            }))
          }
        />
      )}
      <SelectField
        label="Toimiiko ilmastointi"
        options={yesOrNo}
        value={formData.workshop.ac}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            workshop: { ...prev.workshop, ac: v },
          }))
        }
      />
      {formData.workshop.ac === 2 && (
        <div>
          <SelectField
            label="Ilmastointihuolto on jo tehty"
            options={yesOrNo}
            value={formData.workshop.acService}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                workshop: { ...prev.workshop, acService: v },
              }))
            }
          />
          <SelectField
            label="Korjataanko"
            options={yesOrNo}
            value={formData.workshop.acRepair}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                workshop: { ...prev.workshop, acRepair: v },
              }))
            }
          />
        </div>
      )}
      <CheckboxField
        label="Korjaamossa vaihdettavia polttimoita"
        checked={formData.workshop.bulbChange}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            workshop: { ...prev.workshop, bulbChange: v },
          }))
        }
      />
      {formData.workshop.bulbChange && (
        <TextField
          label="Mikä/mitkä"
          value={formData.workshop.bulbs}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              workshop: { ...prev.workshop, bulbs: v },
            }))
          }
        />
      )}
      <CheckboxField
        label="Pyöränkulmien tarkastus ja säätö tehtävä"
        checked={formData.workshop.wheelAlignment}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            workshop: { ...prev.workshop, wheelAlignment: v },
          }))
        }
      />
      <TextAreaField
        label="Muuta korjattavaa"
        value={formData.workshop.otherRepairs}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            workshop: { ...prev.workshop, otherRepairs: v },
          }))
        }
        rows={4}
      />
    </>
  );
};

export default OtherService;
