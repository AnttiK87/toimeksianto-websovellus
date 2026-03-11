import { useEffect } from 'react';

import CheckboxPaint from '../uiComponents/CheckboxPaint.js';
import TextAreaField from '../uiComponents/TextAreaField.js';

import type { PaintForm } from '@shared/index.js';

import carFrontImage from '../../assets/carFrontImage.png';

interface CarFrontProps {
  formData: PaintForm;
  setFormData: React.Dispatch<React.SetStateAction<PaintForm>>;
}

const CarFront: React.FC<CarFrontProps> = ({ formData, setFormData }) => {
  const frontFields: {
    key: keyof PaintForm['front'];
    label: string;
    x: string;
    y: string;
  }[] = [
    { key: 'bumberLeft', label: 'Etupuskurin vasen kulma', x: '85%', y: '65%' },
    { key: 'bumberMiddle', label: 'Etupuskuri', x: '50%', y: '72%' },
    { key: 'bumberRight', label: 'Etupuskurin oikea kulma', x: '15%', y: '65%' },

    { key: 'bonnet', label: 'Konepelti', x: '50%', y: '40%' },

    { key: 'mirrorLeft', label: 'Vasen sivupeili', x: '95%', y: '30%' },
    { key: 'mirrorRight', label: 'Oikea sivupeili', x: '5%', y: '30%' },
  ];

  const updateTop = (field: keyof PaintForm['front'], value: boolean) => {
    const label = frontFields.find((f) => f.key === field)?.label;

    setFormData((prev) => {
      let description = prev.front.description || '';

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
        front: {
          ...prev.front,
          [field]: value,
          description,
        },
      };
    });
  };
  return (
    <>
      <div className="car-text-container">
        <div className="car-front-container">
          <img src={carFrontImage} className="car-image" />

          {frontFields.map(({ key, label, x, y }) => (
            <CheckboxPaint
              key={key}
              checked={formData.front[key] as boolean}
              onChange={(v) => updateTop(key, v)}
              x={x}
              y={y}
            />
          ))}
        </div>
        <TextAreaField
          label="Vaurion kuvaus"
          value={formData.front.description}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              front: { ...prev.front, description: v },
            }))
          }
          rows={6}
          custom="text-area paint-area"
          customGroup="paint-description"
        />
      </div>
    </>
  );
};

export default CarFront;
