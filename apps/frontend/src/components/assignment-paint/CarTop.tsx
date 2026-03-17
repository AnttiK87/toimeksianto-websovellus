import { useEffect } from 'react';

import CheckboxPaint from '../uiComponents/CheckboxPaint.js';
import TextAreaField from '../uiComponents/TextAreaField.js';

import type { PaintForm } from '@shared/index.js';

import carTopImage from '../../assets/carTopImage.png';

interface CarTopProps {
  formData: PaintForm;
  setFormData: React.Dispatch<React.SetStateAction<PaintForm>>;
}

const CarTop: React.FC<CarTopProps> = ({ formData, setFormData }) => {
  const topFields: {
    key: keyof PaintForm['top'];
    label: string;
    x: string;
    y: string;
  }[] = [
    { key: 'roofLeft', label: 'Kattopaarre vasen', x: '60%', y: '77%' },
    { key: 'roofMiddle', label: 'Katto pelti', x: '60%', y: '50%' },
    { key: 'roofRight', label: 'Kattopaarre oikea', x: '60%', y: '23%' },
    { key: 'bonnet', label: 'Konepelti', x: '10%', y: '50%' },
    { key: 'rearlidTop', label: 'Takaluukun yläosa', x: '87%', y: '50%' },
    { key: 'rearFenderLeft', label: 'Vasemman takalokasuojan yläosa', x: '90%', y: '83%' },
    { key: 'rearFenderRight', label: 'Oikean takalokasuojan yläosa', x: '90%', y: '17%' },
    { key: 'frontFenderLeft', label: 'Vasemman etulokasuoja yläosa', x: '20%', y: '92%' },
    { key: 'frontFenderRight', label: 'Oikean etulokasuoja yläosa', x: '20%', y: '8%' },
  ];

  const updateTop = (field: keyof PaintForm['top'], value: boolean) => {
    const label = topFields.find((f) => f.key === field)?.label;

    setFormData((prev) => {
      let description = prev.top.description || '';

      if (label) {
        if (value) {
          // lisää vain jos ei jo olemassa
          if (!description.includes(label)) {
            description = description ? `${description}\n${label}` : label;
          }
        } else {
          // poista label tekstistä
          description = description
            .split('\n')
            .filter((line) => line.trim() !== label)
            .join('\n');
        }
      }

      return {
        ...prev,
        top: {
          ...prev.top,
          [field]: value,
          description,
        },
      };
    });
  };
  return (
    <>
      <div className="car-text-container-top">
        <div className="car-top-container">
          <img src={carTopImage} className="car-image" />

          {topFields.map(({ key, label, x, y }) => (
            <CheckboxPaint
              key={key}
              checked={formData.top[key] as boolean}
              onChange={(v) => updateTop(key, v)}
              x={x}
              y={y}
            />
          ))}
        </div>
        <TextAreaField
          label="Vaurion kuvaus"
          value={formData.top.description}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              top: { ...prev.top, description: v },
            }))
          }
          rows={5}
          custom="text-area paint-area-top"
          customGroup="paint-description-top"
        />
      </div>
    </>
  );
};

export default CarTop;
