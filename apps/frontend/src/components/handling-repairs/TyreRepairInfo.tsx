import { UsedCarForm, RepairPatch } from '@assignment/shared/index.js';
import { Card } from 'react-bootstrap';

import SelectField from '../uiComponents/SelectField.js';
import TextField from '../uiComponents/TextField.js';
import DateField from '../uiComponents/DateField.js';

import { tyreTypes, useTyres, ordered } from '../../utils/formOptions.js';

type TyreRepairInfoProps = {
  data: UsedCarForm;
  changedTyreInfo: RepairPatch[];
  setChangedTyreInfo: React.Dispatch<React.SetStateAction<RepairPatch[]>>;
};

type TyreSetProps = {
  title?: string;

  usedStatePath: string;
  orderedPath: string;
  orderDatePath: string;
  usedTyrePath: string;
  tyreSize1Path: string;
  tyreSize2Path: string;
  storagePath: string;

  usedState: number | null;
  orderedValue: number | null;
  orderDateValue: string;
  usedTyre: string;
  tyreSize1: string;
  tyreSize2: string;
  storage: string;

  difference: boolean;
};

const TyreRepairInfo: React.FC<TyreRepairInfoProps> = ({
  data,
  changedTyreInfo,
  setChangedTyreInfo,
}) => {
  if (!data) {
    return <p>Renkaiden tietoja ei löytynyt.</p>;
  }

  const tyres = data.tyres.newTyres;

  const getPatchValue = <T,>(path: string, fallback: T): T => {
    const patch = changedTyreInfo.find((p) => p.path === path);

    return patch ? (patch.value as T) : fallback;
  };

  const updatePatch = (path: string, value: RepairPatch['value']) => {
    setChangedTyreInfo((prev) => {
      const filtered = prev.filter((p) => p.path !== path);

      return [
        ...filtered,
        {
          path,
          value,
        },
      ];
    });
  };

  const renderTyreSet = ({
    title,
    usedStatePath,
    orderedPath,
    orderDatePath,
    usedTyrePath,
    tyreSize1Path,
    tyreSize2Path,
    storagePath,
    usedState,
    orderedValue,
    orderDateValue,
    usedTyre,
    tyreSize1,
    tyreSize2,
    storage,
    difference,
  }: TyreSetProps) => {
    const currentUsedState = getPatchValue(usedStatePath, usedState);
    const currentOrdered = getPatchValue(orderedPath, orderedValue);
    const currentOrderDate = getPatchValue(orderDatePath, orderDateValue);
    const currentUsedTyre = getPatchValue(usedTyrePath, usedTyre);
    const currentTyreSize1 = getPatchValue(tyreSize1Path, tyreSize1);
    const currentTyreSize2 = getPatchValue(tyreSize2Path, tyreSize2);
    const currentStorage = getPatchValue(storagePath, storage);

    return (
      <>
        {title && <h3 className="tyre-title">{title}</h3>}

        <SelectField
          label="Asennettavat renkaat"
          options={useTyres}
          value={currentUsedState}
          onChange={(v) => updatePatch(usedStatePath, v)}
        />

        {currentUsedState === 0 && (
          <>
            <SelectField
              label="Renkaat on"
              options={ordered}
              value={currentOrdered}
              onChange={(v) => updatePatch(orderedPath, v)}
            />
            <DateField
              label="Tilauspvm"
              value={currentOrderDate}
              onChange={(v) => updatePatch(orderDatePath, v)}
            />
          </>
        )}

        <TextField
          label="Merkki ja malli"
          value={currentUsedTyre}
          onChange={(v) => updatePatch(usedTyrePath, v)}
          custom="tyres-input-width-2"
        />

        <TextField
          label={difference ? 'Rengaskoko etu' : 'Rengaskoko'}
          value={currentTyreSize1}
          onChange={(v) => updatePatch(tyreSize1Path, v)}
        />

        {difference && (
          <TextField
            label="Rengaskoko taka"
            value={currentTyreSize2}
            onChange={(v) => updatePatch(tyreSize2Path, v)}
          />
        )}

        <TextField
          label="Sijainti"
          value={currentStorage}
          onChange={(v) => updatePatch(storagePath, v)}
        />
      </>
    );
  };

  return (
    <Card className="repair-info-card">
      <Card.Body>
        <p>
          Uusittavat renkaat:{' '}
          <strong>
            {tyres.tyreType !== null
              ? (tyreTypes.find((s) => s.id === tyres.tyreType)?.label ?? 'Tuntematon')
              : 'Ei määritetty'}
          </strong>
        </p>

        {tyres.tyreType !== 2 ? (
          renderTyreSet({
            usedStatePath: 'newTyres.usedState',
            orderedPath: 'newTyres.ordered',
            orderDatePath: 'newTyres.orderDate',
            usedTyrePath: 'newTyres.usedTyre',
            tyreSize1Path: 'newTyres.tyreSize1',
            tyreSize2Path: 'newTyres.tyreSize2',
            storagePath: 'newTyres.storage',

            usedState: tyres.usedState,
            orderedValue: tyres.ordered,
            orderDateValue: tyres.orderDate,
            usedTyre: tyres.usedTyre,
            tyreSize1: tyres.tyreSize1,
            tyreSize2: tyres.tyreSize2,
            storage: tyres.storage,

            difference: tyres.difference,
          })
        ) : (
          <>
            {renderTyreSet({
              title: 'Kesärenkaat',

              usedStatePath: 'newTyres.usedState',
              orderedPath: 'newTyres.ordered',
              orderDatePath: 'newTyres.orderDate',
              usedTyrePath: 'newTyres.usedTyre',
              tyreSize1Path: 'newTyres.tyreSize1',
              tyreSize2Path: 'newTyres.tyreSize2',
              storagePath: 'newTyres.storage',

              usedState: tyres.usedState,
              orderedValue: tyres.ordered,
              orderDateValue: tyres.orderDate,
              usedTyre: tyres.usedTyre,
              tyreSize1: tyres.tyreSize1,
              tyreSize2: tyres.tyreSize2,
              storage: tyres.storage,

              difference: tyres.difference,
            })}

            {renderTyreSet({
              title: 'Talvirenkaat',

              usedStatePath: 'newTyres.usedState2',
              orderedPath: 'newTyres.ordered2',
              orderDatePath: 'newTyres.orderDate2',
              usedTyrePath: 'newTyres.usedTyre2',
              tyreSize1Path: 'newTyres.tyreSize3',
              tyreSize2Path: 'newTyres.tyreSize4',
              storagePath: 'newTyres.storage2',

              usedState: tyres.usedState2,
              orderedValue: tyres.ordered2,
              orderDateValue: tyres.orderDate2,
              usedTyre: tyres.usedTyre2,
              tyreSize1: tyres.tyreSize3,
              tyreSize2: tyres.tyreSize4,
              storage: tyres.storage2,

              difference: tyres.difference,
            })}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TyreRepairInfo;
