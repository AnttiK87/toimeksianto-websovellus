import LoginForm from './components/login/LoginForm.js';
import UsedCarAssignment from './components/assignment-form/UsedCarAssignment.js';
import AssignmentList from './components/assignment-list/AssignmentList.js';
import Navbar from './components/navbar/Navbar.js';
import Notification from './components/uiComponents/Notification.js';
import HandleRepairs from './components/handling-repairs/HandleRepairs.js';
import VehicleInfo from './components/vehicle-info/VehicleInfo.js';

import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Navbar piilotetaan login sivulta */}
      <div className="no-print">{location.pathname !== '/' && <Navbar />}</div>
      <Notification />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/toimeksianto-lomake" element={<UsedCarAssignment />} />
        <Route path="/toimeksiannot" element={<AssignmentList />} />
        <Route path="/toimeksiannot/:index" element={<HandleRepairs />} />
        <Route path="/ajoneuvon-tiedot/:index" element={<VehicleInfo />} />
      </Routes>
    </>
  );
}

export default App;
