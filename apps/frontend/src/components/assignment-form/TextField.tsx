import Form from 'react-bootstrap/Form';

type TextFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}: </Form.Label>
      <Form.Control
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default TextField;
