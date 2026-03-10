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
    { key: 'roofLeft', label: 'Kattopaarre vasen', x: '77%', y: '38%' },
    { key: 'roofMiddle', label: 'Katto pelti', x: '50%', y: '38%' },
    { key: 'roofRight', label: 'Kattopaarre oikea', x: '23%', y: '38%' },
    { key: 'bonnet', label: 'Konepelti', x: '50%', y: '85%' },
    { key: 'rearlidTop', label: 'Takaluukun yläosa', x: '50%', y: '12%' },
    { key: 'rearFenderLeft', label: 'Vasemman takalokasuojan yläosa', x: '82%', y: '10%' },
    { key: 'rearFenderRight', label: 'Oikean takalokasuojan yläosa', x: '18%', y: '10%' },
    { key: 'frontFenderLeft', label: 'Vasemman etulokasuoja yläosa', x: '92%', y: '80%' },
    { key: 'frontFenderRight', label: 'Oikean etulokasuoja yläosa', x: '8%', y: '80%' },
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
        rows={4}
        custom="text-area paint-description"
      />
    </>
  );
};

export default CarTop;
