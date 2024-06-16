import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [taskData, setTaskData] = useState(null);
  const [result, setResult] = useState(null);


  // Function to fetch task data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-properties');
      setTaskData(response.data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  // Function to send calculations to the backend
  const sendCalculations = async () => {
    try {
      const response = await axios.post('http://localhost:5000/post-calculations');
      setResult(response.data.result);
      //This console.log is only used to show the necessary feedback as an evaluation criteria for the technical test
      console.log('Server response when sending calculations:', response.data);
    } catch (error) {
      console.error('Error sending calculations:', error);
    }
  };

  // useEffect to load task data when assembling the component
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Ventures Calculations</h1>
      {taskData ? (
        <div>
          <h2>Task Data</h2>
          <p>ID: {taskData.id}</p>
          <p>Operation: {taskData.operation}</p>
          <p>Numbers: {taskData.left} e {taskData.right}</p>
          <button onClick={sendCalculations}>Send calculation</button>
        </div>
      ) : (
        <p>Loading task data and calculations...</p>
      )}
      {result && (
        <div>
          <h2>Task Result</h2>
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default App;

