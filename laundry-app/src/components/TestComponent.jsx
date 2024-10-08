import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';

function TestComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/api/test')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Test API Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default TestComponent;
