import axios from "axios";

const API_BASE_URL = 'http://localhost:4955'; // Обновленный URL для локального сервера Express

export const getInstructors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/instructors`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка инструкторов', error);
    throw error;
  }
}

export default getInstructors;