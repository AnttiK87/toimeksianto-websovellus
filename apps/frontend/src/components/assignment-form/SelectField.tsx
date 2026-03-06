import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type Option = {
  id: number;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: Option[];
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  unit?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = '',
  unit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onChange(val === '' ? null : Number(val));
  };

  return (
    <Form.Group className="formGroup">
      <Form.Label>{label}: </Form.Label>
      <InputGroup>
        <Form.Select value={value ?? ''} onChange={handleChange}>
          <option value="">{placeholder}</option>

          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
        {unit && <InputGroup.Text className="unit-text"> {unit}</InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
};

export default SelectField;
