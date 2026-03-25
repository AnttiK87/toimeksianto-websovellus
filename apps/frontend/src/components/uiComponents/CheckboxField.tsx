import Form from 'react-bootstrap/Form';

type CheckboxFieldProps = {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  custom?: string;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, checked, onChange, custom }) => {
  return (
    <Form.Group className="formGroup">
      <Form.Check
        className={`form-checkbox ${custom}`}
        type="checkbox"
        label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Form.Group>
  );
};

export default CheckboxField;
