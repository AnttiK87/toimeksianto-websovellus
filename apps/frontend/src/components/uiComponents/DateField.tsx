import Form from 'react-bootstrap/Form';

type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
};

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange, min, max }) => {
  return (
    <Form.Group className="formGroup">
      <Form.Label>{label}: </Form.Label>
      <Form.Control
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default DateField;
