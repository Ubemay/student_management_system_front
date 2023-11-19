import axios from "axios";

const API_BASE_URL = 'http://localhost:4952'; // Обновленный URL для локального сервера Express

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка курсов', error);
    throw error;
  }
}

export default getCourses;