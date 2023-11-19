import axios from 'axios';

const API_BASE_URL = 'http://localhost:4951';

export const createGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/groups`, groupData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании группы', error);
    throw error;
  }
};