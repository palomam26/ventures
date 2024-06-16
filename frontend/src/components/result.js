import { useState, useEffect } from 'react';
import axios from 'axios';

const Result = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const URL = 'http://localhost:5000/get-properties'; 

    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setResult(response.data);
      } catch (error) {
        console.error('Error when fetching result:', error);
      }
    };

    fetchData();
  }, []);

  if (!result) return <div>Loading...</div>;

  return (
    <div>
      <h1>Operation Result</h1>
      <p>ID: {result.data.id}</p>
      <p>Result: {result.data.result}</p>
    </div>
  );
};

export default Result;