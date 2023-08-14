import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        // Register your company and obtain the authorization token
        
        const authResponse = await axios.post('http://20.244.56.144/train/auth', {
          companyName: 'Train Central',
          clientID: 'b46128a0-fbde-4c16-a4b1-gae6ad718e27',
          clientSecret: 'xoyolorpaykbodan',
          ownerName: 'Ram',
          rollNo: '1',
        });
        
        const authToken = authResponse.data.access_token;

        // Fetch train data
        const trainsResponse = await axios.get('http://20.244.56.144/train/trains', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        const currentTime = new Date();
        const filteredTrains = trainsResponse.data.filter(train => {
          const departureTime = new Date(currentTime);
          departureTime.setHours(train.departureTime.Hours, train.departureTime.Minutes, train.departureTime.Seconds);
          const timeDifference = departureTime - currentTime;
          return timeDifference > 30 * 60 * 1000; // 30 minutes
        });

        const sortedTrains = filteredTrains.sort((a, b) => {
          const priceComparison = a.price.sleeper + a.price.AC - (b.price.sleeper + b.price.AC);
          if (priceComparison !== 0) {
            return priceComparison;
          }

          const seatsComparison = b.seatsAvailable.sleeper + b.seatsAvailable.AC - (a.seatsAvailable.sleeper + a.seatsAvailable.AC);
          if (seatsComparison !== 0) {
            return seatsComparison;
          }

          const aDepartureTime = new Date(currentTime);
          aDepartureTime.setHours(a.departureTime.Hours, a.departureTime.Minutes, a.departureTime.Seconds);
          const bDepartureTime = new Date(currentTime);
          bDepartureTime.setHours(b.departureTime.Hours, b.departureTime.Minutes, b.departureTime.Seconds);

          return bDepartureTime - aDepartureTime;
        });

        setTrains(sortedTrains);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrains();
  }, []);
  
  return (
    <div>
      <h1>Train Schedule</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <h2>{train.trainName}</h2>
            <p>Train Number: {train.trainNumber}</p>
            <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
            <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
            <p>Delayed By: {train.delayedBy} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
