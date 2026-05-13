import { useEffect, useState, useMemo } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import UsedCarAssignment from '../assignment-form/UsedCarAssignment.js';
import { initialUsedCarForm } from '../assignment-form/initialUsedCarForm.js';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.js';
import { fetchAllAssignments, removeAssignrment } from '../../reducers/assignmentReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';
import { useNavigate } from 'react-router-dom';

import TableRow from './TableRow.js';
import QuickLocationEdit from '../location-edit/QuickLocationEdit.js';

import './AssignmentList.css';

const AssignmentList = () => {
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState<UsedCarForm>(initialUsedCarForm);
  const [search, setSearch] = useState('');

  const [locationEdit, setLocationEdit] = useState<null | UsedCarForm>(null);
  const [show, setShow] = useState(false);

  const openLocationEdit = (assignment: UsedCarForm) => {
    console.log('kutsutaan');
    setLocationEdit(assignment);
    setShow(true);
  };

  const closeLocationEdit = () => {
    setLocationEdit(null);
    setShow(false);
  };

  const allAssignments = useAppSelector((state) => state.assignment.allAssignments);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    dispatch(fetchAllAssignments())
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [dispatch]);

  const editAssignment = (assignment: UsedCarForm) => {
    setSelected(assignment);
    setEdit(true);
  };

  const deleteAssignment = async (assignment: UsedCarForm) => {
    const confirmed = window.confirm(
      `Haluatko varmasti poistaa toimeksiannon rekisterinumerolla: ${assignment.regNum}?`,
    );
    if (confirmed) {
      await dispatch(removeAssignrment(assignment));
    }
  };

  const editRepairs = (id: number | undefined) => {
    navigate(`/toimeksiannot/${id}`);
  };

  const showInfo = (id: number | undefined) => {
    navigate(`/ajoneuvon-tiedot/${id}`);
  };

  const filteredAssignments = useMemo(() => {
    const query = search.toLowerCase();

    return [...allAssignments]
      .filter((a: UsedCarForm) => {
        return a.regNum?.toLowerCase().startsWith(query) || a.vin?.toLowerCase().startsWith(query);
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allAssignments, search]);

  if (edit) {
    return <UsedCarAssignment assignment={selected} edit={edit} setEdit={setEdit} />;
  }

  return (
    <div className="assignment-container">
      <Card className="assignment-card">
        <Card.Body>
          <div className="headerAndSearch">
            <h2 className="assignment-title">Toimeksiannot</h2>
            <div className="searchCont">
              <input
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Haku rek.nro tai VIN..."
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>

          <Table hover>
            <thead>
              <tr>
                <th>Rek.nro</th>
                <th>Merkki ja malli</th>
                <th>Sijainti</th>
                <th className="centerItem">Käsitelty</th>
                <th className="centerItem">Valmiit</th>
                <th className="centerItem">Korjaukset</th>
                <th className="centerItem">Muokkaa</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={2} className="table-message">
                    <Spinner animation="border" size="sm" /> Ladataan...
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan={2} className="table-error">
                    Virhe toimeksiantoja ladattaessa
                  </td>
                </tr>
              )}

              {!isLoading && !isError && allAssignments.length === 0 && (
                <tr>
                  <td colSpan={2} className="table-message">
                    Ei toimeksiantoja
                  </td>
                </tr>
              )}

              {!isLoading &&
                !isError &&
                filteredAssignments.map((assignment, index) => (
                  <>
                    <TableRow
                      index={index}
                      assignment={assignment}
                      editAssignment={editAssignment}
                      editRepair={editRepairs}
                      deleteAssignment={deleteAssignment}
                      openLocationEdit={openLocationEdit}
                      showInfo={showInfo}
                    />
                  </>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {locationEdit && (
        <QuickLocationEdit
          show={show}
          currentAssignment={locationEdit}
          closeLocationEdit={closeLocationEdit}
        />
      )}
    </div>
  );
};

export default AssignmentList;
