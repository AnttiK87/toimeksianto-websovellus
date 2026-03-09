import { SubmitEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useRedux.js';
import { login } from '../../reducers/userReducer.js';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import TextField from '../uiComponents/TextField.js';
import Button from '../uiComponents/Button.js';

import amLogo from '../../assets/am-logo.png';

import './LoginForm.css';

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/toimeksiannot');
    }
  }, [user]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const reset = () => {
    setPassword('');
    setEmail('');
  };

  const loginToSystem = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="LoginFormContainer">
      <div className="LoginForm">
        <img src={amLogo} alt="Autoliike Miettinen" />
        <h1 className="login-subtitle">Toimeksianto sovellus</h1>
        <h2 className="login-login-title">Kirjaudu sisään</h2>

        <Form onSubmit={loginToSystem}>
          <TextField
            value={email}
            placeholder="Sähköpostiosoite"
            onChange={setEmail}
            custom="login-input"
            customFormGroup="login-form-group"
            required={true}
          />
          <TextField
            type="password"
            value={password}
            placeholder="Salasana"
            onChange={setPassword}
            custom="login-input"
            customFormGroup="login-form-group"
            required={true}
          />
          <div className="form-section-title buttons">
            <Button variant="danger" type="button" onClick={() => reset()}>
              Tyhjennä
            </Button>
            <Button variant="primary" type="submit">
              Kirjaudu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
