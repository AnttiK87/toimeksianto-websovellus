import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import DateField from '../uiComponents/DateField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';
import AnimatedCheckbox from '../uiComponents/AnimatedCheckbox.js';

import type {
  CategorizedRepair,
  Repair,
  RepairPatch,
} from '../../../../../packages/shared/src/index.js';

interface RepairsTableProps {
  repairs: CategorizedRepair[];
  localRepairs: RepairPatch[];
  setLocalRepairs: React.Dispatch<React.SetStateAction<RepairPatch[]>>;
}

const RepairsTable: React.FC<RepairsTableProps> = ({ repairs, localRepairs, setLocalRepairs }) => {
  //console.log(repairs);
  const getRepairValue = (item: CategorizedRepair, key: keyof Repair): string | boolean => {
    const path = `${item.repairPath}.${key}`; // täsmällinen patch path
    const localPatch = localRepairs.find((p) => p.path === path);

    if (localPatch && localPatch.value !== undefined) return localPatch.value;

    const repair = item.repair;
    if (!repair) return key === 'ready' ? false : '';
    return repair[key];
  };

  const handleEdit = (item: CategorizedRepair, key: keyof Repair, value: string | boolean) => {
    const path = `${item.repairPath}.${key}`;

    setLocalRepairs((prev) => {
      const filtered = prev.filter((p) => !(p.path === path));
      return [...filtered, { path, value }];
    });
    console.log(path);
  };

  useEffect(() => {
    console.log(localRepairs);
  }, [localRepairs]);

  return (
    <Table className="my-table">
      <thead>
        <tr className="tr-repair">
          <th className="repair">Korjaus</th>
          <th>Aika vararattu</th>
          <th>Työmääräys</th>
          <th className="centerItem">Valmis</th>
        </tr>
      </thead>
      <tbody>
        {repairs.map((item, index) => (
          <tr className="tr-repair" key={index}>
            <td className="repair">
              <b>{item.name}</b>
            </td>
            <td>
              <DateField
                value={getRepairValue(item, 'reservation') as string}
                onChange={(v) => handleEdit(item, 'reservation', v)}
              />
            </td>
            <td>
              {item.name != 'Katsastus' && (
                <TextField
                  value={getRepairValue(item, 'workorder') as string}
                  onChange={(v) => handleEdit(item, 'workorder', v)}
                />
              )}
            </td>
            <td className="centerItem">
              <AnimatedCheckbox
                checked={getRepairValue(item, 'ready') as boolean}
                onChange={(v) => handleEdit(item, 'ready', v)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RepairsTable;
