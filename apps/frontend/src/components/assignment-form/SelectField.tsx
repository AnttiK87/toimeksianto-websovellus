import Form from 'react-bootstrap/Form';

type Option = {
  id: number;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: Option[];
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = '',
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={(e) => onChange(Number(e.target.id))}>
        <option value={undefined}>{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectField;
