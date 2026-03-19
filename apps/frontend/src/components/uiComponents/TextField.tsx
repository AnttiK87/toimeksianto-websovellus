import { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type TextFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  unit?: string;
  custom?: string;
  customLabel?: string;
  customFormGroup?: string;
  required?: boolean;
  enterFunction?: () => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  unit,
  custom,
  customLabel,
  customFormGroup,
  required,
  enterFunction,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && custom === 'long-input') {
      // Lasketaan tekstin pituus + vähän paddingia
      inputRef.current.style.width = `${Math.max(value.length + 1, 1)}ch`;
    }
  }, [value]);

  return (
    <Form.Group className={`formGroup ${customFormGroup}`}>
      <Form.Label className={customLabel}>
        {label}
        {label && ': '}
      </Form.Label>

      <InputGroup>
        <Form.Control
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (enterFunction) enterFunction();
            }
          }}
          className={custom}
          required={required}
        />

        {unit && <InputGroup.Text className="unit-text"> {unit}</InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
};

export default TextField;
