import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useRedux.js';
import type { AppDispatch } from '../../reducers/store.js';
import { fetchAssignment } from '../../reducers/assignmentReducer.js';

import DateField from '../uiComponents/DateField.js';
import TextField from '../uiComponents/TextField.js';
import CheckboxField from '../uiComponents/CheckboxField.js';

import { useParams } from 'react-router-dom';
import { collectRepairs, groupRepairsByCategory } from '../../utils/repairs.js';

import './HandleRepairs.css';
import Service from '../assignment-form/Service.js';

const HandleRepairs = () => {
  const { index } = useParams();
  const id = index && Number(index);

  const dispatch = useDispatch<AppDispatch>();
  const savedAssignment = useAppSelector((state) => state.assignment.selectedAssignment);

  useEffect(() => {
    if (id && !Number.isNaN(id)) dispatch(fetchAssignment(id));
  }, [index]);

  const repairs = collectRepairs(savedAssignment);
  const grouped = groupRepairsByCategory(repairs);

  return (
    <div className="handle-repair-container">
      <Card className="handle-repair-card">
        <Card.Body>
          <h1>{savedAssignment.car.regNum}</h1>
          <h3 className="noMargin">{savedAssignment.car.makeAndModel}</h3>
          <div className="same-row">
            <p className="noMargin">Ajomäärä: {savedAssignment.car.mileage} km</p>
            <p className="noMargin">Rek.pvm: {savedAssignment.car.regDate}</p>
            {savedAssignment.warranty.enabled && <p>TEHDAS TAKUU VOIMASSA</p>}
          </div>
          <h2>Ajoneuvolle määritetyt korjaustyöt:</h2>
          <h3>Yleiset korjaustyöt:</h3>
          {grouped.general.map((item, index) => (
            <div className="same-row" key={index}>
              <p>{item.name}</p>
              <DateField label="Varattu" value={''} onChange={() => {}} />
              <TextField
                label="Työmääräys"
                value={''}
                onChange={() => {}}
                custom="tyres-input-width-2"
              />
              <CheckboxField label="Työ valmis" checked={false} onChange={() => {}} />
            </div>
          ))}
          <h3>Rengastyöt:</h3>
          {grouped.tyres.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
          <h3>Korikorjaustyöt:</h3>
          {grouped.body.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HandleRepairs;
