import Form from 'react-bootstrap/Form';

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  custom?: string;
  customGroup?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  custom,
  customGroup,
}) => {
  return (
    <Form.Group className={`formGroup text-area-group ${customGroup}`}>
      <Form.Label>{label}: </Form.Label>
      <Form.Control
        className={custom}
        as="textarea"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default TextAreaField;
