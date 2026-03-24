import { locations } from '../../utils/formOptions.js';
import { collectRepairs, getRepairStats, groupRepairsByCategory } from '../../utils/repairs.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCar, faCircleDot, faPen } from '@fortawesome/free-solid-svg-icons';

import type { UsedCarForm, StatsGeneral } from '@shared/dist/index.js';

interface TableRowProps {
  index: number;
  assignment: UsedCarForm;
  editAssignment: (assignment: UsedCarForm) => void;
  editRepair: (id: number | undefined) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, assignment, editAssignment, editRepair }) => {
  const repairs = collectRepairs(assignment);
  const stats = getRepairStats(repairs);
  const grouped = groupRepairsByCategory(repairs);

  const statsTyres = getRepairStats(grouped.tyres);
  const statsBody = getRepairStats(grouped.body);
  const statsGeneral = getRepairStats(grouped.general);

  const getRepairColor = (stats: StatsGeneral) => {
    if (stats.total === 0) return 'grey';
    if (stats.handled < stats.total) return 'red';
    if (stats.ready === stats.total) return 'green';
    return 'orange';
  };

  const repairTypeIcons = [
    {
      icon: faWrench,
      color: getRepairColor(statsGeneral),
    },
    {
      icon: faCircleDot,
      color: getRepairColor(statsTyres),
    },
    {
      icon: faCar,
      color: getRepairColor(statsBody),
    },
  ].filter(Boolean);

  return (
    <tr key={index}>
      <td>{assignment.regNum}</td>
      <td>{assignment.car.makeAndModel}</td>
      <td>{locations.find((l) => l.id === assignment.location)?.label ?? '-'}</td>
      <td className="centerItem">
        {stats.handled} / {stats.total}
      </td>
      <td className="centerItem">
        {stats.ready} / {stats.total}
      </td>
      <td
        className="centerItem"
        onClick={() => editRepair(assignment.id)}
        style={{ cursor: 'pointer' }}
      >
        {repairTypeIcons.map((item, idx) => (
          <FontAwesomeIcon
            key={idx}
            icon={item!.icon}
            style={{
              marginRight: 8,
              color: item!.color,
            }}
          />
        ))}
      </td>
      <td className="centerItem">
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => editAssignment(assignment)}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
};

export default TableRow;
