import axios from "axios";

const API_BASE_URL = 'http://localhost:4956'; // Обновленный URL для локального сервера Express

export const getStudentsCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student-courses`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка курсов', error);
    throw error;
  }
}

export default getStudentsCourses;