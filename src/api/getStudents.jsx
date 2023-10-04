import axios from "axios";

const API_BASE_URL = 'http://localhost:4950'; // Обновленный URL для локального сервера Express

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка студентов', error);
    throw error;
  }
}
