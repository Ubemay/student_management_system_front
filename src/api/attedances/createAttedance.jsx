import axios from 'axios';

const API_BASE_URL = 'http://localhost:4953';

export const createAttedance = async (attedancesData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/attedances`, attedancesData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании посещения', error);
    throw error;
  }
}; 