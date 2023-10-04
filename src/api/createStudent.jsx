import axios from 'axios';

const API_BASE_URL = 'http://localhost:4950'; // Замените на адрес вашего REST API

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student`, studentData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании студента', error);
    throw error;
  }
};