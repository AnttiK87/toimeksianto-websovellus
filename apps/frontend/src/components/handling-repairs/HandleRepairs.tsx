import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { locations } from '../../utils/formOptions.js';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useRedux.js';
import type { AppDispatch } from '../../reducers/store.js';
import { fetchAssignment, editRepairs } from '../../reducers/assignmentReducer.js';
import { fetchSalesUsers } from '../../reducers/usersReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import RepairsTable from './RepairsTable.js';
import RepairInfoModal from './RepairInfoModal.js';
import Button from '../uiComponents/Button.js';
import TextAreaField from '../uiComponents/TextAreaField.js';
import SelectField from '../uiComponents/SelectField.js';

import { useParams } from 'react-router-dom';
import { collectRepairs, groupRepairsByCategory, getRepairStats } from '../../utils/repairs.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCar, faCircleDot, faX, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import type {
  StatsGeneral,
  RepairPatch,
  User,
  UsedCarForm,
  CategorizedRepair,
} from '../../../../../packages/shared/src/index.js';

import './HandleRepairs.css';

const HandleRepairs = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const [localRepairs, setLocalRepairs] = useState<RepairPatch[]>([]);

  const { index } = useParams<{ index: string }>();
  const id = Number(index);

  if (isNaN(id)) {
    throw new Error('Invalid ID: not a number');
  }

  const idNumber: number = id;

  const dispatch = useDispatch<AppDispatch>();
  const savedAssignment: UsedCarForm = useAppSelector(
    (state) => state.assignment.selectedAssignment,
  );

  useEffect(() => {
    dispatch(fetchAssignment(idNumber));
  }, [index]);

  const salesUsers: User[] = useAppSelector((state) => state.users.salesUsers);

  useEffect(() => {
    dispatch(fetchSalesUsers());
  }, [dispatch]);

  const [location, setLocation] = useState(savedAssignment.location);
  const [additionalInfo, setAdditionalInfo] = useState(savedAssignment.additionalInfo || '');

  useEffect(() => {
    setLocation(savedAssignment.location);
    setAdditionalInfo(savedAssignment.additionalInfo || '');
  }, [savedAssignment]);

  const [repairs, setRepairs] = useState(collectRepairs(savedAssignment));
  const [grouped, setGrouped] = useState(groupRepairsByCategory(repairs));

  useEffect(() => {
    setRepairs(collectRepairs(savedAssignment));
  }, [savedAssignment]);

  useEffect(() => {
    setGrouped(groupRepairsByCategory(repairs));
  }, [repairs]);

  const statsTyres = getRepairStats(grouped.tyres);
  const statsBody = getRepairStats(grouped.body);
  const statsGeneral = getRepairStats(grouped.general);

  const getRepairColor = (stats: StatsGeneral) => {
    if (stats.total === 0) return 'grey';
    if (stats.handled < stats.total) return 'red';
    if (stats.ready === stats.total) return 'green';
    return 'orange';
  };

  const formatFiDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Ei määritetty';

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return 'Ei määritetty';

    return new Intl.DateTimeFormat('fi-FI').format(date);
  };

  const isInspectionSoon = (dateStr?: string | null) => {
    if (!dateStr) return false;

    const today = new Date();
    const inspectionDate = new Date(dateStr);

    if (isNaN(inspectionDate.getTime())) return false;

    const diffMs = inspectionDate.getTime() - today.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays <= 30;
  };

  const close = () => {
    if (localRepairs.length === 0) {
      navigate(`/toimeksiannot`);
    } else {
      const confirmed = window.confirm(
        'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
      );
      if (confirmed) {
        navigate(`/toimeksiannot`);
        setLocalRepairs([]);
      }
    }
  };

  const handleSave = async (formId: number) => {
    if (localRepairs.length === 0) return;

    if (!formId) return;

    await dispatch(editRepairs(formId, localRepairs));
    setLocalRepairs([]);
  };

  const [currentRepair, setCurrentRepair] = useState<null | CategorizedRepair>(null);
  const [show, setShow] = useState(false);

  const openRepairModal = (repair: CategorizedRepair) => {
    console.log('kutsutaan');
    setCurrentRepair(repair);
    setShow(true);
  };

  const closeRepairModal = () => {
    setCurrentRepair(null);
    setShow(false);
  };

  return (
    <div className="handle-repair-container">
      <Card className="handle-repair-card">
        <Card.Body>
          <div className="same-row-repair">
            <h1>{savedAssignment.regNum}</h1>
            <FontAwesomeIcon className="close-icon" onClick={() => close()} icon={faX} />
          </div>
          <h3 className="noMargin">{savedAssignment.car.makeAndModel}</h3>
          <div className="same-row">
            <p className="noMargin">
              <strong>Alustanumero:</strong> {savedAssignment.vin}
            </p>
            <p className="noMargin">
              <strong>Ajomäärä:</strong> {savedAssignment.car.mileage} km
            </p>
          </div>
          <div className="same-row">
            <p className="noMargin">
              <strong>Rek.pvm:</strong> {formatFiDate(savedAssignment.car.regDate)}
            </p>
            {savedAssignment.warranty.enabled && (
              <>
                <p className="noMargin bold">TEHDAS TAKUU ON VOIMASSA</p>
                <p className="noMargin">
                  {savedAssignment.warranty.until
                    ? formatFiDate(savedAssignment.warranty.until) + ' asti'
                    : 'Päättymispäivää ei ole merkattu'}
                </p>
              </>
            )}
          </div>
          <div className="same-row">
            <p
              className="noMargin"
              style={{
                color: isInspectionSoon(savedAssignment.inspection.date) ? 'red' : undefined,
                fontWeight: isInspectionSoon(savedAssignment.inspection.date) ? 'bold' : undefined,
              }}
            >
              <strong style={{ color: 'black' }}>Seuraava katsastus:</strong>{' '}
              {formatFiDate(savedAssignment.inspection.date)}
            </p>
          </div>
          {savedAssignment.sold && (
            <div className="same-row">
              <p className="noMargin bold" style={{ color: 'red' }}>
                TÄMÄ AUTO ON MYYTY!
              </p>
              <p className="noMargin" style={{ color: 'red' }}>
                <strong>Luovutus päivä:</strong> {formatFiDate(savedAssignment.handOverDate)}
              </p>
            </div>
          )}
          <div className="same-row">
            <p className="noMargin">
              <strong>Myyjä:</strong>{' '}
              {salesUsers.find((u) => u.id === savedAssignment.salesMan)?.name}
            </p>
            <p className="noMargin">
              <strong>Toimeksianto:</strong> {formatFiDate(savedAssignment.date)},{' '}
              {savedAssignment.assigneer}
            </p>
          </div>
          <h2>Ajoneuvolle määritetyt korjaustyöt:</h2>
          <div className="border-top">
            <div className="same-row">
              <SelectField
                label="Ajoneuvon sijainti"
                options={locations}
                value={location}
                classSelect="location-select"
                classLabel="location-label"
                onChange={(v) => {
                  setLocation(v);
                  setLocalRepairs((prev) => {
                    const filtered = prev.filter((p) => p.path !== 'location');

                    return [
                      ...filtered,
                      {
                        path: 'location',
                        value: v,
                      },
                    ];
                  });
                }}
              />
            </div>
            {repairs.length === 0 && <p>Ajoneuvolle ei ole määritetty korjauksia.</p>}
            {grouped.general.length > 0 && (
              <>
                <h3>
                  <FontAwesomeIcon
                    icon={faWrench}
                    style={{
                      marginRight: 8,
                      color: getRepairColor(statsGeneral),
                    }}
                  />{' '}
                  Yleiset korjaustyöt:
                </h3>
                <RepairsTable
                  repairs={grouped.general}
                  localRepairs={localRepairs}
                  setLocalRepairs={setLocalRepairs}
                  openRepairModal={openRepairModal}
                />
              </>
            )}
            {grouped.tyres.length > 0 && (
              <>
                <h3>
                  <FontAwesomeIcon
                    icon={faCircleDot}
                    style={{
                      marginRight: 8,
                      color: getRepairColor(statsTyres),
                    }}
                  />{' '}
                  Rengastyöt:
                </h3>

                <RepairsTable
                  repairs={grouped.tyres}
                  localRepairs={localRepairs}
                  setLocalRepairs={setLocalRepairs}
                  openRepairModal={openRepairModal}
                />
              </>
            )}
            {grouped.body.length > 0 && (
              <>
                <h3>
                  <FontAwesomeIcon
                    icon={faCar}
                    style={{
                      marginRight: 8,
                      color: getRepairColor(statsBody),
                    }}
                  />{' '}
                  Korikorjaustyöt:
                </h3>

                <RepairsTable
                  repairs={grouped.body}
                  localRepairs={localRepairs}
                  setLocalRepairs={setLocalRepairs}
                  openRepairModal={openRepairModal}
                />
              </>
            )}
            <div className="border-info">
              <h3 className="additional-info">
                {' '}
                <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                Lisätietoja:
              </h3>
              <TextAreaField
                label="Muita tietoa ajoneuvosta tai korjauksista"
                value={additionalInfo}
                onChange={(v) => {
                  setAdditionalInfo(v);
                  setLocalRepairs((prev) => {
                    const filtered = prev.filter((p) => p.path !== 'additionalInfo');

                    return [
                      ...filtered,
                      {
                        path: 'additionalInfo',
                        value: v,
                      },
                    ];
                  });
                }}
                rows={10}
                custom="text-area info-text info-text-repair"
                customLabel="info-label-repair"
                customGroup="paint-description-top"
              />
            </div>
            <div className="save-button buttons">
              <Button variant="danger" type="button" onClick={() => close()}>
                Sulje
              </Button>
              <Button variant="primary" type="button" onClick={() => handleSave(idNumber)}>
                Tallenna
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      {show && (
        <RepairInfoModal
          show={show}
          currentRepair={currentRepair}
          closeModal={closeRepairModal}
          currentAssignment={savedAssignment}
        />
      )}
    </div>
  );
};

export default HandleRepairs;
