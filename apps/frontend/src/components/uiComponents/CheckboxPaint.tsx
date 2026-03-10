import Form from 'react-bootstrap/Form';

type CheckboxPaintProps = {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  x?: string;
  y?: string;
};

const CheckboxPaint: React.FC<CheckboxPaintProps> = ({ label, checked, onChange, x, y }) => {
  return (
    <Form.Check
      className="paint-checkbox"
      style={{ position: 'absolute', left: x, top: y }}
      type="checkbox"
      label={label}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default CheckboxPaint;
