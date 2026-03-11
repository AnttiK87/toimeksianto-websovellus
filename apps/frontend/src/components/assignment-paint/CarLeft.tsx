import { useEffect } from 'react';

import CheckboxPaint from '../uiComponents/CheckboxPaint.js';
import TextAreaField from '../uiComponents/TextAreaField.js';

import type { PaintForm } from '@shared/index.js';

import carLeftImage from '../../assets/carLeftImage.png';

interface CarLeftProps {
  formData: PaintForm;
  setFormData: React.Dispatch<React.SetStateAction<PaintForm>>;
}

const CarLeft: React.FC<CarLeftProps> = ({ formData, setFormData }) => {
  const leftFields: {
    key: keyof PaintForm['left'];
    label: string;
    x: string;
    y: string;
  }[] = [
    { key: 'frontBumber', label: 'Etupuskurin vasen kulma', x: '5%', y: '70%' },
    { key: 'frontFender', label: 'Vasen etulokasuoja', x: '22%', y: '48%' },

    { key: 'frontDoor', label: 'Vasen etuovi', x: '42%', y: '59%' },
    { key: 'rearDoor', label: 'Vasen takaovi', x: '62%', y: '59%' },

    { key: 'sillFront', label: 'Vasemman helman etuosa', x: '30%', y: '82%' },
    { key: 'sillMiddle', label: 'Vasemman helman keskiosa', x: '48%', y: '82%' },
    { key: 'sillRear', label: 'Vasemman helman takaosa', x: '65%', y: '82%' },

    { key: 'rearFender', label: 'Vasen takalokasuoja', x: '80%', y: '45%' },
    { key: 'rearBumber', label: 'Takapuskurin vasen kulma', x: '90%', y: '70%' },

    { key: 'roofRight', label: 'Katon sivu', x: '60%', y: '5%' },
  ];

  const updateTop = (field: keyof PaintForm['left'], value: boolean) => {
    const label = leftFields.find((f) => f.key === field)?.label;

    setFormData((prev) => {
      let description = prev.left.description || '';

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
        left: {
          ...prev.left,
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
          <img src={carLeftImage} className="car-image" />

          {leftFields.map(({ key, label, x, y }) => (
            <CheckboxPaint
              key={key}
              checked={formData.left[key] as boolean}
              onChange={(v) => updateTop(key, v)}
              x={x}
              y={y}
            />
          ))}
        </div>
        <TextAreaField
          label="Vaurion kuvaus"
          value={formData.left.description}
          onChange={(v) =>
            setFormData((prev) => ({
              ...prev,
              left: { ...prev.left, description: v },
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

export default CarLeft;
