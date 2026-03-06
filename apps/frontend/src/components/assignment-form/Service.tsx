import {
  yesOrNo,
  serviceTypes,
  serviceOptions,
  engineTimingTypes,
} from '../../utils/formOptions.js';

import DateField from './DateField';
import SelectField from './SelectField';
import TextField from './TextField';
import CheckboxField from './CheckboxField';

import type { UsedCarForm } from '@shared/index.js';

interface ServiceProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
  handleChange: (field: keyof UsedCarForm, value: any) => void;
}

const Service: React.FC<ServiceProps> = ({ formData, handleChange, setFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Huoltotoimenpiteet */}
      <h2 className="form-section-title">Huolto</h2>
      <div className="same-row no-gap">
        <TextField
          label="Edellinen huolto suoritettu"
          value={formData.serviceHistory.lastService}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              serviceHistory: { ...prev.serviceHistory, lastService: v },
            }))
          }
          unit="tkm"
          custom="tyres-input-width"
        />
        <DateField
          label="ja pvm"
          value={formData.serviceHistory.lastServiceDate}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              serviceHistory: { ...prev.serviceHistory, lastServiceDate: v },
            }))
          }
        />
      </div>
      <div className="same-row no-gap">
        <TextField
          label="Seuraava huolto"
          value={formData.serviceHistory.nextService}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              serviceHistory: { ...prev.serviceHistory, nextService: v },
            }))
          }
          unit="tkm"
          custom="tyres-input-width"
        />
        <DateField
          label="tai"
          value={formData.serviceHistory.nextServiceDate}
          max={today}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              serviceHistory: { ...prev.serviceHistory, nextServiceDate: v },
            }))
          }
        />
      </div>
      <CheckboxField
        label="Autolle tehtävä huolto"
        checked={formData.service.needed}
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            service: { ...prev.service, needed: v },
          }))
        }
      />
      {formData.service.needed && (
        <div>
          <SelectField
            label="Huolto suoritetaan"
            options={serviceTypes}
            value={formData.service.type}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                service: { ...prev.service, type: v },
              }))
            }
            unit="mukaisesti."
          />
          {formData.service.type === 2 && (
            <div className="service-options">
              {serviceOptions.map((service) => (
                <CheckboxField
                  key={service}
                  label={service}
                  checked={formData.service.selected.includes(service)}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      service: {
                        ...prev.service,
                        selected: checked
                          ? [...prev.service.selected, service]
                          : prev.service.selected.filter((s) => s !== service),
                      },
                    }))
                  }
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
        onChange={(v) =>
          setFormData((prev) => ({
            ...prev,
            timing: { ...prev.timing, type: v },
          }))
        }
      />
      {formData.timing.type === 1 && (
        <div>
          <div className="same-row no-gap">
            <TextField
              label="Vaihtoväli"
              value={formData.timing.beltChangeKm}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  timing: { ...prev.timing, beltChangeKm: v },
                }))
              }
              unit="tkm"
              custom="tyres-input-width"
            />
            <TextField
              label="tai"
              value={formData.timing.beltChangeTime}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  timing: { ...prev.timing, beltChangeTime: v },
                }))
              }
              unit="vuotta"
              custom="tyres-input-width"
            />
          </div>
          <div className="same-row no-gap">
            <TextField
              label="Vaihdettu"
              value={formData.timing.lastBeltChangeKm}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  timing: { ...prev.timing, lastBeltChangeKm: v },
                }))
              }
              unit="tkm,"
              custom="tyres-input-width"
            />
            <TextField
              label="vuonna"
              value={formData.timing.lastBeltChangeTime}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  timing: { ...prev.timing, lastBeltChangeTime: v },
                }))
              }
              custom="tyres-input-width"
            />
          </div>
          <SelectField
            label="Tarvitseeko jakohihna vaihtaa"
            options={yesOrNo}
            value={formData.timing.beltChangeNeeded}
            onChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                timing: { ...prev.timing, beltChangeNeeded: v },
              }))
            }
          />
        </div>
      )}
      {formData.timing.type === 2 && (
        <SelectField
          label="Tarvitseeko jakoketjua vaihtaa"
          options={yesOrNo}
          value={formData.timing.chainChangeNeeded}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              timing: { ...prev.timing, chainChangeNeeded: v },
            }))
          }
        />
      )}
    </>
  );
};

export default Service;
