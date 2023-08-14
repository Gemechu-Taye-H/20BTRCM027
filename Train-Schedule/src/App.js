import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainList from './TrainList'; // Import your TrainList component

function App() {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await axios.post('http://20.244.56.144/train/auth', {
          companyName: 'Train Central',
          clientID: 'YOUR_CLIENT_ID',
          clientSecret: 'YOUR_CLIENT_SECRET',
          // other parameters
        });
        setAuthToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching authorization token:', error);
      }
    };

    fetchAuthToken();
  }, []);

  return (
    <div className="App">
      <TrainList authToken={authToken} />
    </div>
  );
}

export default App;
