import { useEffect } from 'react';

import CheckboxPaint from '../uiComponents/CheckboxPaint.js';
import TextAreaField from '../uiComponents/TextAreaField.js';

import type { PaintForm } from '@shared/index.js';

import carRearImage from '../../assets/carRearImage.png';

interface CarRearProps {
  formData: PaintForm;
  setFormData: React.Dispatch<React.SetStateAction<PaintForm>>;
}

const CarRear: React.FC<CarRearProps> = ({ formData, setFormData }) => {
  const rearFields: {
    key: keyof PaintForm['rear'];
    label: string;
    x: string;
    y: string;
  }[] = [
    { key: 'bumberLeft', label: 'Takapuskurin vasen kulma', x: '10%', y: '60%' },
    { key: 'bumberMiddle', label: 'Koko takapuskuri', x: '50%', y: '68%' },
    { key: 'bumberRight', label: 'Takapuskurin oikea kulma', x: '90%', y: '60%' },

    { key: 'rearlid', label: 'Takaluukun keskiosa', x: '50%', y: '35%' },

    { key: 'backLeft', label: 'Takaluukun alaosa', x: '50%', y: '53%' },
    { key: 'backRight', label: 'Takaluukun yläosa', x: '50%', y: '8%' },
  ];

  const updateTop = (field: keyof PaintForm['rear'], value: boolean) => {
    const label = rearFields.find((f) => f.key === field)?.label;

    setFormData((prev) => {
      let description = prev.rear.description || '';

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
        rear: {
          ...prev.rear,
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
          <img src={carRearImage} className="car-image-front" />

          {rearFields.map(({ key, label, x, y }) => (
            <CheckboxPaint
              key={key}
              checked={formData.rear[key] as boolean}
              onChange={(v) => updateTop(key, v)}
              x={x}
              y={y}
            />
          ))}
        </div>
        <TextAreaField
          label="Vaurion kuvaus"
          value={formData.rear.description}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              rear: { ...prev.rear, description: v },
            }))
          }
          rows={5}
          custom="text-area paint-area"
          customGroup="paint-description"
        />
      </div>
    </>
  );
};

export default CarRear;
