import axios from "axios";

const API_BASE_URL = 'http://localhost:4954'; // Обновленный URL для локального сервера Express

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка департаментов', error);
    throw error;
  }
}

export default getDepartments;