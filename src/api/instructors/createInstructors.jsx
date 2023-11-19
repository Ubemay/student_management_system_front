import axios from 'axios';

const API_BASE_URL = 'http://localhost:4955';

export const createInstructors = async (instructortData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/instructors`, instructortData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании интсруктора', error);
    throw error;
  }
};