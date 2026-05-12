import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import { locations } from '../../utils/formOptions.js';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../reducers/store.js';
import type { RootState } from '../../reducers/store.js';

import { fetchAssignment, editRepairs } from '../../reducers/assignmentReducer.js';

import { fetchSalesUsers } from '../../reducers/usersReducer.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import Button from '../uiComponents/Button.js';
import SelectField from '../uiComponents/SelectField.js';
import AnimatedCheckbox from '../uiComponents/AnimatedCheckbox.js';
import DateField from '../uiComponents/DateField.js';

import type { RepairPatch, User } from '../../../../../packages/shared/src/index.js';

import './VehicleInfo.css';

const VehicleInfo = () => {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { index } = useParams<{ index: string }>();
  const id = Number(index);

  const user = useSelector((state: RootState) => state.user);

  const savedAssignment = useSelector((state: RootState) => state.assignment.selectedAssignment);

  const salesUsers: User[] = useSelector((state: RootState) => state.users.salesUsers);

  const [localRepairs, setLocalRepairs] = useState<RepairPatch[]>([]);
  const [location, setLocation] = useState(savedAssignment.location);
  const [handOverDate, setHandOverDate] = useState(savedAssignment.handOverDate);
  const [sold, setSold] = useState(savedAssignment.sold);

  useEffect(() => {
    setLocation(savedAssignment.location);
    setHandOverDate(savedAssignment.handOverDate);
    setSold(savedAssignment.sold);
  }, [savedAssignment]);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    if (!isNaN(id)) dispatch(fetchAssignment(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchSalesUsers());
  }, [dispatch]);

  useEffect(() => {
    setLocation(savedAssignment.location);
  }, [savedAssignment.location]);

  const salesMap = useMemo(() => {
    return Object.fromEntries(salesUsers.map((u) => [u.id, u.name]));
  }, [salesUsers]);

  const formatFiDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Ei määritetty';

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return 'Ei määritetty';

    return new Intl.DateTimeFormat('fi-FI').format(date);
  };

  const updatePatch = (
    setLocalRepairs: React.Dispatch<React.SetStateAction<RepairPatch[]>>,
    path: string,
    value: RepairPatch['value'],
  ) => {
    setLocalRepairs((prev) => {
      const filtered = prev.filter((p) => p.path !== path);
      return [...filtered, { path, value }];
    });
  };

  const handleSave = async () => {
    console.log('kutsuu');
    if (!id || localRepairs.length === 0) return;

    console.log('edistyy');

    await dispatch(editRepairs(id, localRepairs));
    setLocalRepairs([]);
  };

  const close = () => {
    if (localRepairs.length === 0) {
      navigate('/toimeksiannot');
      setLocalRepairs([]);
      return;
    }

    const confirmed = window.confirm(
      'Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?',
    );

    if (confirmed) navigate('/toimeksiannot');
  };

  return (
    <div className="handle-repair-container">
      <Card className="handle-repair-card">
        <Card.Body>
          <div className="same-row-repair">
            <h1>Ajoneuvon tiedot:</h1>
            <FontAwesomeIcon className="close-icon" onClick={() => close()} icon={faX} />
          </div>
          <h2 className="noMargin">Rekisteritunnus: {savedAssignment.regNum}</h2>
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
                    : 'ei tiedossa'}
                </p>
              </>
            )}
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
              {savedAssignment.salesMan
                ? salesMap[savedAssignment.salesMan]
                : 'Myyjää ei määritetty'}
            </p>
            <p className="noMargin">
              <strong>Toimeksianto:</strong> {formatFiDate(savedAssignment.date)},{' '}
              {savedAssignment.assigneer}
            </p>
          </div>

          <div className="border-top">
            <div className="same-row">
              <p className="bold noMargin">Myyty:</p>
              <AnimatedCheckbox
                checked={sold}
                onChange={(v) => {
                  setSold(v);
                  updatePatch(setLocalRepairs, 'sold', v);
                }}
              />
              <DateField
                label="Luovutuspäivä"
                value={handOverDate}
                min={today}
                onChange={(v) => {
                  setHandOverDate(v);
                  updatePatch(setLocalRepairs, 'handOverDate', v);
                }}
              />
              <SelectField
                label="Ajoneuvon sijainti"
                options={locations}
                value={location}
                classSelect="location-select"
                classLabel="location-label"
                onChange={(v) => {
                  setLocation(v);
                  updatePatch(setLocalRepairs, 'location', v);
                }}
              />
            </div>

            <div className="save-button buttons">
              <Button variant="danger" type="button" onClick={() => close()}>
                Sulje
              </Button>
              <Button variant="primary" type="button" onClick={() => handleSave()}>
                Tallenna
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleInfo;
