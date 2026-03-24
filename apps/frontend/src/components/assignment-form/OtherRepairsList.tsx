import Button from '../uiComponents/Button.js';
import type { OtherRepair } from '@shared/dist/index.js';

interface Props {
  repairs: OtherRepair[];
  onRemove: (index: number) => void;
}

const OtherRepairsList = ({ repairs, onRemove }: Props) => {
  if (!repairs.length) return null;

  return (
    <ul className="repair-list">
      {repairs.map((job, index) => (
        <li key={job.id} className="repair-item">
          <span>{job.otherRepair}</span>

          <Button variant="danger" className="repair-remove" onClick={() => onRemove(index)}>
            ✕
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default OtherRepairsList;
