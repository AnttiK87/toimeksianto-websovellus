import Form from 'react-bootstrap/Form';

type DateFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  classLabel?: string;
  classValue?: string;
  min?: string;
  max?: string;
};

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  classLabel,
  classValue,
}) => {
  return (
    <Form.Group className="formGroup">
      {label && <Form.Label className={classLabel}>{label}: </Form.Label>}
      <Form.Control
        className={classValue}
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
