// services/horoscopeService.js

const API_BASE_URL = 'https://bb51-13-51-200-36.ngrok-free.app/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchHoroscopeData = async () => {
  const userId = localStorage.getItem('email');
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const [numeroTable, birthChart, planets, astroDetails] = await Promise.all([
      fetch(`${API_BASE_URL}/numero_table`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId })
      }).then(res => res.json()),

      fetch(`${API_BASE_URL}/birth_chart`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId })
      }).then(res => res.json()),

      fetch(`${API_BASE_URL}/planets`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId })
      }).then(res => res.json()),

      fetch(`${API_BASE_URL}/astro_details`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId })
      }).then(res => res.json())
    ]);

    return {
      numeroTable,
      birthChart,
      planets,
      astroDetails
    };
  } catch (error) {
    console.error('Error fetching horoscope data:', error);
    throw error;
  }
};