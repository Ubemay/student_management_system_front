import axios from 'axios';

const API_BASE_URL = 'http://localhost:4954';

export const createDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/departments`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании департамента', error);
    throw error;
  }
};