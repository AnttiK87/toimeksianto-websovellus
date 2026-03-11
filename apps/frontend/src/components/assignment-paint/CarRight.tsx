import { useEffect } from 'react';

import CheckboxPaint from '../uiComponents/CheckboxPaint.js';
import TextAreaField from '../uiComponents/TextAreaField.js';

import type { PaintForm } from '@shared/index.js';

import carRightImage from '../../assets/carRightImage.png';

interface CarRightProps {
  formData: PaintForm;
  setFormData: React.Dispatch<React.SetStateAction<PaintForm>>;
}

const CarRight: React.FC<CarRightProps> = ({ formData, setFormData }) => {
  const rightFields: {
    key: keyof PaintForm['right'];
    label: string;
    x: string;
    y: string;
  }[] = [
    { key: 'frontBumber', label: 'Etupuskurin oikea kulma', x: '95%', y: '70%' },
    { key: 'frontFender', label: 'Oikea etulokasuoja', x: '78%', y: '48%' },

    { key: 'frontDoor', label: 'Oikea etuovi', x: '58%', y: '59%' },
    { key: 'rearDoor', label: 'Oikea takaovi', x: '38%', y: '59%' },

    { key: 'sillFront', label: 'Oikean helman etuosa', x: '70%', y: '82%' },
    { key: 'sillMiddle', label: 'Oikean helman keskiosa', x: '52%', y: '82%' },
    { key: 'sillRear', label: 'Oikean helman takaosa', x: '35%', y: '82%' },

    { key: 'rearFender', label: 'Oikea takalokasuoja', x: '20%', y: '45%' },
    { key: 'rearBumber', label: 'Takapuskurin oikea kulma', x: '10%', y: '70%' },

    { key: 'roofRight', label: 'Katon sivu', x: '40%', y: '5%' },
  ];

  const updateTop = (field: keyof PaintForm['right'], value: boolean) => {
    const label = rightFields.find((f) => f.key === field)?.label;

    setFormData((prev) => {
      let description = prev.right.description || '';

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
        right: {
          ...prev.right,
          [field]: value,
          description,
        },
      };
    });
  };
  return (
    <>
      <div className="car-text-container">
        <div className="car-top-container">
          <img src={carRightImage} className="car-image" />

          {rightFields.map(({ key, label, x, y }) => (
            <CheckboxPaint
              key={key}
              checked={formData.right[key] as boolean}
              onChange={(v) => updateTop(key, v)}
              x={x}
              y={y}
            />
          ))}
        </div>
        <TextAreaField
          label="Vaurion kuvaus"
          value={formData.right.description}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              right: { ...prev.right, description: v },
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

export default CarRight;
