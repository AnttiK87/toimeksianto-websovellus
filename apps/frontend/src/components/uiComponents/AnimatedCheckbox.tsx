import Form from 'react-bootstrap/Form';

type AnimatedCheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: number;
  className?: string;
};

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  label,
  checked,
  onChange,
  size = 20,
  className = '',
}) => {
  return (
    <Form.Group className={`formGroup ${className}`}>
      <label
        className="checkbox-wrapper-19"
        style={{ '--checkbox-height': `${size}px` } as React.CSSProperties}
      >
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />

        <span className={`check-box ${checked ? 'checked' : ''}`} />

        {label && <span className="checkbox-label">{label}</span>}
      </label>

      <style>{`
        .checkbox-wrapper-19 {
          --background-color: #fff;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-wrapper-19 input {
          display: none;
        }

        .check-box {
          height: var(--checkbox-height);
          width: var(--checkbox-height);
          border: calc(var(--checkbox-height) * 0.15) solid #e90606;
          border-radius: 5px;
          position: relative;
          display: inline-block;
          transition: border-color 0.2s ease;
        }

        .check-box::before,
        .check-box::after {
          position: absolute;
          height: 0;
          width: calc(var(--checkbox-height) * 0.2);
          background-color: #34b93d;
          border-radius: 5px;
          content: "";
          transform-origin: left top;
        }

        .check-box::before {
          top: calc(var(--checkbox-height) * 0.72);
          left: calc(var(--checkbox-height) * 0.41);
          transform: rotate(-135deg);
        }

        .check-box::after {
          top: calc(var(--checkbox-height) * 0.37);
          left: calc(var(--checkbox-height) * 0.05);
          transform: rotate(-45deg);
        }

        .check-box.checked {
          border-color: #34b93d;
        }

        .check-box.checked::after {
          animation: bottomCheck 0.2s ease forwards;
        }

        .check-box.checked::before {
          animation: topCheck 0.4s ease forwards;
        }

        @keyframes bottomCheck {
          0% { height: 0; }
          100% { height: calc(var(--checkbox-height) / 2); }
        }

        @keyframes topCheck {
          0% { height: 0; }
          50% { height: 0; }
          100% { height: calc(var(--checkbox-height) * 1.2); }
        }

        .checkbox-label {
          user-select: none;
        }
      `}</style>
    </Form.Group>
  );
};

export default AnimatedCheckbox;
