import { SubmitEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useRedux.js';
import { login } from '../../reducers/userReducer.js';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type { RootState } from '../../reducers/store.js';

import './LoginForm.css';

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const userInStore = useSelector((state: RootState) => state.user);
  const userInLocalStorage = localStorage.getItem('loggedAdminUser');

  const user = userInStore
    ? userInStore
    : userInLocalStorage
      ? JSON.parse(userInLocalStorage)
      : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/toimeksiannot');
    }
  }, [user, navigate]);

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

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
        <h2>Autoliike Miettinen toimeksianto sovellus</h2>
        <h2>Kirjaudu sisään</h2>

        <Form onSubmit={loginToSystem}>
          <Form.Group className="form-group">
            <Form.Label htmlFor="username">Sähköposti: </Form.Label>
            <Form.Control
              autoComplete="username"
              id="username"
              data-testid="username"
              className="form__field loginUsername"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="password">Salasana: </Form.Label>
            <Form.Control
              autoComplete="current-password"
              id="password"
              data-testid="password"
              className="form__field loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          <div className="commentButtons">
            <button className="button-primary" type="submit">
              Kirjaudu sisään
            </button>
            <button className="button-primary  delButton" type="button" onClick={() => reset()}>
              Tyhjennä
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
