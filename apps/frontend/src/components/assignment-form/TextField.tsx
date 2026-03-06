import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  unit?: string;
  custom?: string;
  customLabel?: string;
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
}) => {
  return (
    <Form.Group className="formGroup">
      <Form.Label className={customLabel}>{label}: </Form.Label>

      <InputGroup>
        <Form.Control
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={custom}
        />

        {unit && <InputGroup.Text className="unit-text"> {unit}</InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
};

export default TextField;
