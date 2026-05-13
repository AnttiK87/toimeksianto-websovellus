import { useState } from 'react';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import { editRepairs } from '../../reducers/assignmentReducer.js';

import { Button } from 'react-bootstrap';

import type {
  CategorizedRepair,
  UsedCarForm,
  RepairPatch,
} from '../../../../../packages/shared/src/index.js';
import { painters } from '../../utils/formOptions.js';

import ServiceRepairInfo from './ServiceRepairInfo.js';
import AcRepairInfo from './AcRepairInfo.js';
import TyreRepairInfo from './TyreRepairInfo.js';
import DamageRepairInfo from './DamageRepairInfo.js';
import WindscreenRepairInfo from './WindscreenRepairInfo.js';

import '../location-edit/QuickLocationEdit.css';

interface Props {
  show: boolean;
  closeModal: () => void;
  currentRepair: CategorizedRepair | null;
  currentAssignment: UsedCarForm;
}

const RepairInfoModal: React.FC<Props> = ({
  show,
  closeModal,
  currentRepair,
  currentAssignment,
}) => {
  const [changedTyreInfo, setChangedTyreInfo] = useState<RepairPatch[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    if (!changedTyreInfo) return;

    if (!currentAssignment.id) return;

    const finalPatches = changedTyreInfo.map((p) => ({
      ...p,
      path: `tyres.${p.path}`,
    }));

    await dispatch(editRepairs(currentAssignment.id, finalPatches));
    setChangedTyreInfo([]);
  };

  const getRepairSection = (path: string) => {
    if (!path) return null;

    return path.split('.').slice(0, -1).join('.');
  };

  const renderRepairInfo = (repairPath: string) => {
    const section = repairPath.split('.').slice(0, -1).join('.');

    switch (section) {
      case 'service':
        return <ServiceRepairInfo data={currentAssignment} />;

      case 'otherServiceWork.ac':
        return <AcRepairInfo data={currentAssignment} />;

      case 'tyres.newTyres':
        return (
          <TyreRepairInfo
            data={currentAssignment}
            changedTyreInfo={changedTyreInfo}
            setChangedTyreInfo={setChangedTyreInfo}
          />
        );

      case 'damage':
        return <DamageRepairInfo data={currentAssignment} />;

      case 'windshield':
        return <WindscreenRepairInfo data={currentAssignment} />;

      case 'bodyWarranty':
        return (
          <>
            <p>Autossa on vaurio, josta on tehtävä koritakuukysely.</p>
            {currentAssignment.bodyWarranty.repairIsMade && (
              <>
                <p>Vaurio korjataan joka tapauksessa.</p>
                <p>
                  Maalari:{' '}
                  <strong>
                    {currentAssignment.bodyWarranty.painter !== null
                      ? (painters.find((s) => s.id === currentAssignment.bodyWarranty.painter)
                          ?.label ?? 'Tuntematon')
                      : 'Ei määritetty'}
                  </strong>
                </p>
              </>
            )}
          </>
        );

      case 'timing':
        return (
          <>
            {currentAssignment.timing.type === 0 ? (
              <>
                <p>Jakohihnan vaihto on ajankohtainen.</p>
                <p>
                  Hihna vaihdettu edellisen kerran:{' '}
                  <strong>
                    {currentAssignment.timing.lastBeltChangeTime
                      ? new Date(currentAssignment.timing.lastBeltChangeTime).toLocaleDateString()
                      : '???'}
                  </strong>{' '}
                  ja{' '}
                  <strong>
                    {currentAssignment.timing.lastBeltChangeKm
                      ? currentAssignment.timing.lastBeltChangeKm
                      : '???'}
                  </strong>{' '}
                  km
                </p>
              </>
            ) : (
              <p>Jakoketju vaatii korjausta/vaihtoa.</p>
            )}
          </>
        );

      case 'inspection':
        return (
          <>
            <p>Katsastus on ajankohtainen.</p>
            <p>
              Katsastus suoritettava{' '}
              <strong>
                {currentAssignment.inspection.date
                  ? new Date(currentAssignment.inspection.date).toLocaleDateString()
                  : 'ei tiedossa'}
              </strong>{' '}
              mennessä.
            </p>
          </>
        );

      default:
        return (
          <>
            <p>Ei toimi ja vaatii korjausta tai huoltoa.</p>
            <p>Tarkempia tietoja ei saatavilla.</p>
          </>
        );
    }
  };

  return (
    <div className={`overlay ${show ? 'show' : ''}`}>
      <div className="overlayContent">
        <div>
          <h2 className="title-location">{currentRepair?.name}:</h2>
        </div>

        <div className="selectLocation">
          {currentRepair ? renderRepairInfo(currentRepair.repairPath) : <p>Ei tietoja</p>}
        </div>

        <div className="buttons location-buttons">
          <Button variant="danger" onClick={() => closeModal()}>
            Sulje
          </Button>
          {currentRepair && getRepairSection(currentRepair.repairPath) === 'tyres.newTyres' && (
            <Button variant="primary" onClick={handleSave}>
              Tallenna
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairInfoModal;
