import LoginForm from './components/login/LoginForm';
import UsedCarAssignment from './components/assignment-form/usedCarAssignment';

import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/toimeksianto-lomake" element={<UsedCarAssignment />} />
      </Routes>
    </>
  );
}

export default App;
