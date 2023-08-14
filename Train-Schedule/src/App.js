import { useState, useEffect } from 'react';
import axios from 'axios';

const TrainList = ({ authToken }) => {
  const [setTrains] = useState([]);
  const [setSpecificTrain] = useState(null);

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

    const fetchSpecificTrain = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/train/trains/2344', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setSpecificTrain(response.data);
      } catch (error) {
        console.error('Error fetching specific train:', error);
      }
    };

    fetchTrains();
    fetchSpecificTrain();
  }, [authToken, setSpecificTrain, setTrains]);

  // ... The rest of your TrainList component code
};

export default TrainList;
