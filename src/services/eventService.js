import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem('userToken');
  const response = await axios.post(API_URL, eventData, {
    headers: { Authorization: token },
  });
  return response.data;
};
