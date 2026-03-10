import LoginForm from './components/login/LoginForm';
import UsedCarAssignment from './components/assignment-form/UsedCarAssignment';
import PaintAssignment from './components/assignment-paint/paintAssignment';
import AssignmentList from './components/assignment-list/AssignmentList';
import Navbar from './components/navbar/Navbar';
import Notification from './components/uiComponents/Notification';

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Navbar piilotetaan login sivulta */}
      {location.pathname !== '/' && <Navbar />}
      <Notification />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/toimeksianto-lomake" element={<UsedCarAssignment />} />
        <Route path="/toimeksiannot" element={<AssignmentList />} />
        <Route path="/maalaus" element={<PaintAssignment regNro="testi" />} />
      </Routes>
    </>
  );
}

export default App;
