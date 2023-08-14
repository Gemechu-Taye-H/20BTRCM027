import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainList = ({ authToken }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/train/trains', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, [authToken]);

  return (
    <div>
      <h1>Train Schedule</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <h2>{train.trainName}</h2>
            <p>Train Number: {train.trainNumber}</p>
            <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            {/* Display other information like seatsAvailable, price, etc. */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
