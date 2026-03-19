import LoginForm from './components/login/LoginForm';
import UsedCarAssignment from './components/assignment-form/UsedCarAssignment';
import AssignmentList from './components/assignment-list/AssignmentList';
import Navbar from './components/navbar/Navbar';
import Notification from './components/uiComponents/Notification';
import HandleRepairs from './components/handling-repairs/HandleRepairs';

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
        <Route path="/assignments/:index" element={<HandleRepairs />} />
      </Routes>
    </>
  );
}

export default App;
