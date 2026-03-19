import { useState, useEffect } from 'react';

import { yesOrNo } from '../../utils/formOptions.js';
import Button from '../uiComponents/Button.js';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';
import OtherRepairsList from './OtherRepairsList.js';

import { resetHeater, resetAc, resetBulbChange } from './formResetters';

import type { UsedCarForm } from '@shared/index.js';

interface OtherServiceProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const OtherService: React.FC<OtherServiceProps> = ({ formData, setFormData }) => {
  const [otherJob, setOtherJob] = useState<string>('');

  const addRepair = () => {
    if (otherJob === '') return;

    setFormData((prev) => ({
      ...prev,
      otherServiceWork: {
        ...prev.otherServiceWork,
        otherRepairs: [
          ...prev.otherServiceWork.otherRepairs,
          {
            id: crypto.randomUUID(),
            otherRepair: otherJob,
            repair: null,
          },
        ],
      },
    }));

    setOtherJob('');
  };

  const removeRepair = (index: number) => {
    console.log('Removing repair at index:', index);
    setFormData((prev) => ({
      ...prev,
      otherServiceWork: {
        ...prev.otherServiceWork,
        otherRepairs: prev.otherServiceWork.otherRepairs.filter((_, i) => i !== index),
      },
    }));
  };

  useEffect(() => {
    setFormData((prev) => resetHeater(prev));
  }, [formData.otherServiceWork.heater.heater]);

  useEffect(() => {
    setFormData((prev) => resetAc(prev));
  }, [formData.otherServiceWork.ac.ac]);

  useEffect(() => {
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
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            otherServiceWork: {
              ...prev.otherServiceWork,
              heater: { ...prev.otherServiceWork.heater, heater: v },
            },
          }))
        }
      />
      {formData.otherServiceWork.heater.heater === 2 && (
        <div className="bottom-divider">
          <CheckboxField
            label="Korjataan"
            checked={formData.otherServiceWork.heater.heaterRepair}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                otherServiceWork: {
                  ...prev.otherServiceWork,
                  heater: { ...prev.otherServiceWork.heater, heaterRepair: v },
                },
              }))
            }
          />
        </div>
      )}
      <SelectField
        label="Toimiiko ilmastointi"
        options={yesOrNo}
        value={formData.otherServiceWork.ac.ac}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            otherServiceWork: {
              ...prev.otherServiceWork,
              ac: { ...prev.otherServiceWork.ac, ac: v },
            },
          }))
        }
      />
      {formData.otherServiceWork.ac.ac === 2 && (
        <div className="bottom-divider">
          <CheckboxField
            label="Korjataan"
            checked={formData.otherServiceWork.ac.acRepair}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                otherServiceWork: {
                  ...prev.otherServiceWork,
                  ac: { ...prev.otherServiceWork.ac, acRepair: v },
                },
              }))
            }
          />
          <SelectField
            label="Ilmastointihuolto on jo tehty"
            options={yesOrNo}
            value={formData.otherServiceWork.ac.acService}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                otherServiceWork: {
                  ...prev.otherServiceWork,
                  ac: { ...prev.otherServiceWork.ac, acService: v },
                },
              }))
            }
          />
        </div>
      )}
      <CheckboxField
        label="Korjaamossa vaihdettavia polttimoita"
        checked={formData.otherServiceWork.bulbChange.bulbChange}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            otherServiceWork: {
              ...prev.otherServiceWork,
              bulbChange: { ...prev.otherServiceWork.bulbChange, bulbChange: v },
            },
          }))
        }
      />
      {formData.otherServiceWork.bulbChange.bulbChange && (
        <TextField
          label="Mikä/mitkä"
          value={formData.otherServiceWork.bulbChange.bulbs}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              otherServiceWork: {
                ...prev.otherServiceWork,
                bulbChange: { ...prev.otherServiceWork.bulbChange, bulbs: v },
              },
            }))
          }
        />
      )}
      <CheckboxField
        label="Pyöränkulmien tarkastus ja säätö tehtävä"
        checked={formData.otherServiceWork.wheelAlignment.wheelAlignment}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            otherServiceWork: {
              ...prev.otherServiceWork,
              wheelAlignment: { ...prev.otherServiceWork.wheelAlignment, wheelAlignment: v },
            },
          }))
        }
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
