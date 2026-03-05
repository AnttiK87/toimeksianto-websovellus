import Form from 'react-bootstrap/Form';

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, checked, onChange }) => {
  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Form.Group>
  );
};

export default CheckboxField;
