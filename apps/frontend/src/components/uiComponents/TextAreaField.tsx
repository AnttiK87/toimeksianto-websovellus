import Form from 'react-bootstrap/Form';

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  custom?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  custom,
}) => {
  return (
    <Form.Group className="formGroup text-area-group">
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
