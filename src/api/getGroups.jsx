import axios from "axios";

const API_BASE_URL = 'http://localhost:4951'; // Обновленный URL для локального сервера Express

export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/groups`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка студентов', error);
    throw error;
  }
}

export default getGroups;