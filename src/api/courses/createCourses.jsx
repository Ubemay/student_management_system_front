import axios from 'axios';

const API_BASE_URL = 'http://localhost:4952';

export const createCourses = async (coursesData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/courses`, coursesData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании курса', error);
    throw error;
  }
}; 