import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import UsedCarAssignment from '../assignment-form/UsedCarAssignment';
import { initialUsedCarForm } from '../assignment-form/initialUsedCarForm.js';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.js';
import { fetchAllAssignments } from '../../reducers/assignmentReducer.js';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import type { UsedCarForm } from '@shared/dist/index.js';
import { useNavigate } from 'react-router-dom';

import TableRow from './TableRow.js';

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

  const editRepairs = (id: number | undefined) => {
    navigate(`/toimeksiannot/${id}`);
  };

  if (edit) {
    return <UsedCarAssignment assignment={selected} edit={edit} setEdit={setEdit} />;
  }

  return (
    <div className="assignment-container">
      <Card className="assignment-card">
        <Card.Body>
          <h2 className="assignment-title">Toimeksiannot</h2>

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
                allAssignments.map((assignment, index) => (
                  <>
                    <TableRow
                      index={index}
                      assignment={assignment}
                      editAssignment={editAssignment}
                      editRepair={editRepairs}
                    />
                  </>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AssignmentList;
