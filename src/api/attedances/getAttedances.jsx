import axios from "axios";

const API_BASE_URL = 'http://localhost:4953'; // Обновленный URL для локального сервера Express

export const getAttedances = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/attendances`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка посещения', error);
    throw error;
  }
}

export default getAttedances;