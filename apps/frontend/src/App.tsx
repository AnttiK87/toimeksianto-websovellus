import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching backend!'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Frontend Test</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
