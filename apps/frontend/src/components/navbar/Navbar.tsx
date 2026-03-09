import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer.js';
import type { AppDispatch } from '../../reducers/store';

import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    const storedUser = localStorage.getItem('loggedAdminUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(logout(user.token));
    }
    localStorage.removeItem('loggedAdminUser');

    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/toimeksianto-lomake">Uusi toimeksianto</Link>
        <Link to="/toimeksiannot">Toimeksiannot</Link>
      </div>

      <div className="nav-right">
        <button onClick={handleLogout}>Kirjaudu ulos</button>
      </div>
    </nav>
  );
};

export default Navbar;
