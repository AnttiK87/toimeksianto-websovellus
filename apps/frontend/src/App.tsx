import LoginForm from './components/login/LoginForm';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
